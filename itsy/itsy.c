#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <emscripten.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>
#include "lua.h"
#include <lauxlib.h>
#include <lualib.h>

uint8_t memory[0x8000];
SDL_Window *window;
SDL_Renderer *renderer;
SDL_Texture *texture;

SDL_Rect rects[128][128];
uint16_t pixel[128][128];

uint8_t pixels[128 * 128 * 4];

int colors[][3] = {
  { 0x00, 0x00, 0x00 },
  { 0x5F, 0x57, 0x4F },
  { 0xC2, 0xC3, 0xC7 },
  { 0xFF, 0xF1, 0xE8 },
  { 0xFF, 0xEC, 0x27 },
  { 0xFF, 0xA3, 0x00 },
  { 0xFF, 0xCC, 0xAA },
  { 0xAB, 0x52, 0x36 },
  { 0xFF, 0x77, 0xA8 },
  { 0xFF, 0x00, 0x4D },
  { 0x83, 0x76, 0x9C },
  { 0x7E, 0x25, 0x53 },
  { 0x29, 0xAD, 0xFF },
  { 0x1D, 0x2B, 0x53 },
  { 0x00, 0x87, 0x51 },
  { 0x00, 0xE4, 0x36 }
};

int frame = 0;

void loop(void);
void render(void);

int pget(int x, int y);

static int pset(lua_State *L);
static void __pset(int x, int y, int c);

static int line(lua_State *L);
static void __line(int x0, int y0, int x1, int y1, int col);

static int rect(lua_State *L);
static int circ(lua_State *L);

void luaopen_itsy (lua_State *L);

lua_State* lua;

SDL_Texture *sprite;

EMSCRIPTEN_KEEPALIVE
void register_sprite(char *name, int size, void *data)
{
  SDL_RWops *a = SDL_RWFromConstMem(data, size);
  printf("%s: %d\n", name, size);
  printf("%d\n", (int)data);
  printf("%s\n", SDL_GetError());

  SDL_GetWindowSurface(window);
  SDL_Surface *image = IMG_Load_RW(a, 1);
  if(!image) {
    printf("IMG_Load_RW: %s\n", IMG_GetError());
    printf("%s\n", SDL_GetError());
    // handle error
  }
  printf("%dx%d\n", image->w, image->h);

  sprite = SDL_CreateTextureFromSurface(renderer, image);

  //SDL_RenderCopy(renderer, sprite, NULL, NULL);
  //SDL_RenderPresent(renderer);
  // SDL_FreeSurface(image);
  // SDL_UpdateWindowSurface(window);
}

int main(int argc, char **argv)
{
  // printf("%s\n", argv[1]);
  for (int addr = 0x6000; addr <= 0x7FFF; addr++) {
    memory[addr] = 0;
  }

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      rects[x][y].x = x;
      rects[x][y].y = y;
      rects[x][y].w = 1;
      rects[x][y].h = 1;
    }
  }

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      pixel[x][y] = 0x6000 + (y * 64) + floor(x / 2);
    }
  }

  SDL_Init(SDL_INIT_VIDEO);
  SDL_CreateWindowAndRenderer(128, 128, 0, &window, &renderer);

  texture = SDL_CreateTexture(
    renderer,
    SDL_PIXELFORMAT_ARGB8888,
    SDL_TEXTUREACCESS_STREAMING,
    128,
    128
  );

  lua = luaL_newstate();
  //luaL_openlibs(lua);
  luaopen_itsy(lua);

  luaL_dostring(lua, argv[1]);
  emscripten_set_main_loop(loop, -1, 1);

  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);
  SDL_Quit();

  return 0;
}

void loop(void)
{
  render();
  frame++;

  lua_getglobal(lua, "_update");
  lua_pcall(lua, 0, 0, 0);

  if (frame > 1000) {
    emscripten_cancel_main_loop();
  }
}

void render(void)
{
  SDL_SetRenderDrawColor(renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(renderer);

  if (sprite != NULL) {
    SDL_RenderCopy(renderer, sprite, NULL, NULL);
  }

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      int c = pget(x, y);
      const unsigned int offset = (128 * 4 * y ) + x * 4;
      pixels[ offset + 0 ] = colors[c][2];        // b
      pixels[ offset + 1 ] = colors[c][1];        // g
      pixels[ offset + 2 ] = colors[c][0];        // r
      pixels[ offset + 3 ] = SDL_ALPHA_OPAQUE;    // a
    }
  }

  SDL_UpdateTexture(
    texture,
    NULL,
    &pixels[0],
    128 * 4
  );

  // printf("Frame: %d\n", frame);
  SDL_RenderCopy(renderer, texture, NULL, NULL);
  SDL_RenderPresent(renderer);
  SDL_UpdateWindowSurface(window);
}

void luaopen_itsy (lua_State *L)
{
  lua_pushcfunction(L, circ);
  lua_setglobal(L, "circ");

  lua_pushcfunction(L, line);
  lua_setglobal(L, "line");

  lua_pushcfunction(L, pset);
  lua_setglobal(L, "pset");

  lua_pushcfunction(L, rect);
  lua_setglobal(L, "rect");

  // luaL_setfuncs(L, itsy_funcs, 0);

  // luaopen_base(L);
  // lua_pushcfunction(L, luaopen_base);
  // lua_call(L, 0, 0);
  luaL_requiref(L, "_G", luaopen_base, 1);
  luaL_dostring(L, "assert = nil");
  luaL_dostring(L, "collectgarbage = nil");
  luaL_dostring(L, "dofile = nil");
  luaL_dostring(L, "error = nil");
  luaL_dostring(L, "getmetatable = nil");
  luaL_dostring(L, "ipairs = nil");
  luaL_dostring(L, "loadfile = nil");
  luaL_dostring(L, "load = nil");
  luaL_dostring(L, "loadstring = nil");
  luaL_dostring(L, "next = nil");
  // luaL_dostring(L, "pairs = nil");
  luaL_dostring(L, "pcall = nil");
  // using this!
  // luaL_dostring(L, "print = nil");
  luaL_dostring(L, "rawequal = nil");
  luaL_dostring(L, "rawlen = nil");
  luaL_dostring(L, "rawget = nil");
  luaL_dostring(L, "rawset = nil");
  luaL_dostring(L, "select = nil");
  luaL_dostring(L, "setmetatable = nil");
  // luaL_dostring(L, "tonumber = nil");
  // luaL_dostring(L, "tostring = nil");
  // luaL_dostring(L, "type = nil");
  luaL_dostring(L, "xpcall = nil");
  luaL_dostring(L, "_G = nil");
  luaL_dostring(L, "_VERSION = nil");

  // luaopen_math(L);
  // lua_pushcfunction(L, luaopen_math);
  // lua_pushstring(L, "math");
  // lua_call(L, 1, 0);
  luaL_requiref(L, "math", luaopen_math, 1);
  luaL_dostring(L, "abs = math.abs");
  luaL_dostring(L, "max = math.max");
  luaL_dostring(L, "min = math.min");
  luaL_dostring(L, "pow = math.pow");
  luaL_dostring(L, "flr = math.floor");
  luaL_dostring(L, "ceil = math.ceil");
  luaL_dostring(L, "math = nil");
  luaL_dostring(L, "pi = nil");
  luaL_dostring(L, "huge = nil");
  luaL_dostring(L, "maxinteger = nil");
  luaL_dostring(L, "mininteger = nil");
}

int pget(int x, int y)
{
  return x % 2 == 0
    ? memory[pixel[x][y]] & 0x0f
    : memory[pixel[x][y]] >> 4;
}

static int pset(lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);
  int c = luaL_checknumber(L, 3);

  __pset(x, y, c);
  return 0;
}

static void __pset(int x, int y, int c)
{
  memory[pixel[x][y]] = x % 2 == 0
    ? ((memory[pixel[x][y]] >> 4) << 4) | c
    : (c << 4) | (memory[pixel[x][y]] & 0x0f);
}

// https://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#C
static int line(lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_checknumber(L, 5);

  __line(x0, y0, x1, y1, col);

  return 0;
}

static void __line(int x0, int y0, int x1, int y1, int col)
{
  int dx = abs(x1 - x0);
  int dy = abs(y1 - y0);
  int sy = y0 < y1 ? 1 : -1;
  int sx = x0 < x1 ? 1 : -1;
  int err = (dx > dy ? dx : -dy) / 2;

  for (;;) {
    __pset(x0, y0, col);

    if (x0 == x1 && y0 == y1) {
      break;
    }

    int e2 = err;

    if (e2 >- dx) {
      err -= dy;
      x0 += sx;
    }

    if (e2 < dy) {
      err += dx;
      y0 += sy;
    }
  }
}

static int rect(lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_checknumber(L, 5);

  __line(x0, y0, x1, y0, col);
  __line(x1, y0, x1, y1, col);
  __line(x1, y1, x0, y1, col);
  __line(x0, y1, x0, y0, col);

  return 0;
}

// https://en.wikipedia.org/wiki/Midpoint_circle_algorithm#C_example
static int circ(lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);
  int r = luaL_checknumber(L, 3);
  int c = luaL_checknumber(L, 4);

  int cx = r - 1;
  int cy = 0;
  int dx = 1;
  int dy = 1;
  int err = dx - (r << 1);

  while (cx >= cy) {
    __pset(x + cx, y + cy, c);
    __pset(x + cy, y + cx, c);
    __pset(x - cy, y + cx, c);
    __pset(x - cx, y + cy, c);
    __pset(x - cx, y - cy, c);
    __pset(x - cy, y - cx, c);
    __pset(x + cy, y - cx, c);
    __pset(x + cx, y - cy, c);

    if (err <= 0) {
      cy++;
      err += dy;
      dy += 2;
    }

    if (err > 0) {
      cx--;
      dx += 2;
      err += dx - (r << 1);
    }
  }

  return 0;
}
