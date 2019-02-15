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
#include "b64.h"

uint8_t memory[0x8000];
SDL_Window *window;
SDL_Renderer *renderer;
SDL_Texture *texture;

SDL_Rect rects[128][128];
uint16_t sprite[128][128];
uint16_t pixel[128][128];

void getpixel(SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b);
uint8_t pixels[128 * 128 * 4];

/*
// these were wrong but kinda cool so im keepin them
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
  { 0xC@, 0xE4, 0x36 }
};
*/

int colors[][3] = {
  { 0x00, 0x00, 0x00 },
  { 0x1D, 0x2B, 0x53 },
  { 0x7E, 0x25, 0x53 },
  { 0x00, 0x87, 0x51 },

  { 0xAB, 0x52, 0x36 },
  { 0x5F, 0x57, 0x4F },
  { 0xC2, 0xC3, 0xC7 },
  { 0xFF, 0xF1, 0xE8 },

  { 0xFF, 0x00, 0x4D },
  { 0xFF, 0xA3, 0x00 },
  { 0xFF, 0xEC, 0x27 },
  { 0x00, 0xE4, 0x36 },

  { 0x29, 0xAD, 0xFF },
  { 0x83, 0x76, 0x9C },
  { 0xFF, 0x77, 0xA8 },
  { 0xFF, 0xCC, 0xAA }
};

int frame = 0;

void loop(void);
void render(void);

int pget(int x, int y);
int sget(int x, int y);

static void __pset(int x, int y, int c);
static void __sset(int x, int y, int c);

static void __line(int x0, int y0, int x1, int y1, int col);

static int lua_circ(lua_State *L);
static int lua_line(lua_State *L);
static int lua_pset(lua_State *L);
static int lua_rect(lua_State *L);
static int lua_sspr(lua_State *L);

static const luaL_Reg graphics[] = {
  {"circ", lua_circ},
  {"line", lua_line},
  {"pset", lua_pset},
  {"rect", lua_rect},
  {"sspr", lua_sspr},
  {NULL, NULL}
};

void luaopen_itsy (lua_State *L);

lua_State* lua;

SDL_Texture *spritePng;

int main(int argc, char **argv)
{
  char *p;
  char *code = argv[1];
  int spriteCount;
  sscanf(argv[2], "%d", &spriteCount);

  for (int addr = 0x6000; addr <= 0x7FFF; addr++) {
    memory[addr] = 0;
  }

  // printf("code: %s\n", code);
  printf("spriteCount: %d\n", spriteCount);

  if (SDL_Init(SDL_INIT_VIDEO) != 0) {
    SDL_Log("SDL_Init: %s", SDL_GetError());
    return 1;
  }

  if (SDL_CreateWindowAndRenderer(128, 128, 0, &window, &renderer) != 0) {
    SDL_Log("SDL_CreateWindowAndRenderer: %s", SDL_GetError());
    return 1;
  }

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      sprite[x][y] = 0x0000 + (y * 64) + floor(x / 2);
      pixel[x][y] = 0x6000 + (y * 64) + floor(x / 2);
    }
  }

  int offset = 3;
  int spritePropCount = 2;
  int decsize;
  //for (int i = 0; i < spriteCount; i++) {
  for (int i = 0; i < 1; i++) {
    int nameAt = offset + (i * spritePropCount) + 0;
    int base64At = offset + (i * spritePropCount) + 1;
    unsigned char *img = b64_decode_ex(argv[base64At], strlen(argv[base64At]), &decsize);

    SDL_RWops *a = SDL_RWFromConstMem(img, decsize);
    if (a == NULL) {
      printf("SDL_RWFromConstMem: %s\n", SDL_GetError());
    }

    //SDL_Surface *image = IMG_Load_RW(a, 1);
    SDL_Surface *image = IMG_LoadTyped_RW(a, 1, "PNG");
    if (!image) {
      printf("IMG_Load_RW: %s\n", IMG_GetError());
      printf("IMG_Load_RW: %s\n", SDL_GetError());
    } else {
      printf("%dx%d\n", image->w, image->h);
    }

    spritePng = SDL_CreateTextureFromSurface(renderer, image);
    if (!spritePng) {
      printf("SDL_CreateTextureFromSurface: %s\n", SDL_GetError());
    } else {
      printf("i have loaded a sprite omg\n");
    }

    for (int x = 0; x < 128; x++) {
      for (int y = 0; y < 128; y++) {
        Uint8 r, g, b;
        getpixel(image, x, y, &r, &g, &b);

        for (int c = 0; c < 16; c++) {
          if (colors[c][0] == r && colors[c][1] == g && colors[c][2] == b) {
            // printf("%d %d %d %d %d\n", x, y, r, g, b);
            // 👆 this is printing on every pixel so the sprite must be loading
            __sset(x, y, c);
          }
        }

        // backup location, rgb values are pouring out of this now
        // next steps: decide which 0-15 col value each one is and write to
        // sprite memory
        /*
        5itsy.js?0.2.0:8 255 241 232
        6itsy.js?0.2.0:8 255 0 77
        107itsy.js?0.2.0:8 255 241 232
        itsy.js?0.2.0:8 95 87 79
        7itsy.js?0.2.0:8 255 241 232
        itsy.js?0.2.0:8 95 87 79
        itsy.js?0.2.0:8 0 135 81
        5itsy.js?0.2.0:8 255 241 232
        6itsy.js?0.2.0:8 255 0 77
        445itsy.js?0.2.0:8 255 241 232
        itsy.js?0.2.0:8
        */

      }
    }

    // printf("name %s\n", argv[nameAt]);
    // printf("base64 %s\n", argv[base64At]);
    // printf("base64len %d\n", strlen(argv[base64At]));
    // printf("img %s\n", img);
    // printf("imglen %d\n", strlen(img));
    // printf("decsize %d\n", decsize);
    // printf("img len lololol %d\n", strlen(b64_decode(argv[base64At], strlen(argv[base64At]))));
    // printf("img len lololol %d\n", strlen(b64_decode(hc, strlen(hc))));
  }

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      rects[x][y].x = x;
      rects[x][y].y = y;
      rects[x][y].w = 1;
      rects[x][y].h = 1;
    }
  }

  texture = SDL_CreateTexture(
    renderer,
    SDL_PIXELFORMAT_ARGB8888,
    SDL_TEXTUREACCESS_STREAMING,
    128,
    128
  );

  if (texture == NULL) {
    SDL_Log("SDL_CreateTexture: %s", SDL_GetError());
    return 1;
  }

  lua = luaL_newstate();
  //luaL_openlibs(lua);
  luaopen_itsy(lua);

  luaL_dostring(lua, code);
  emscripten_set_main_loop(loop, -1, 1);

  //SDL_DestroyRenderer(renderer);
  //SDL_DestroyWindow(window);
  //SDL_Quit();

  return 0;
}

void loop(void)
{
  render();
  frame++;
  // printf("loop: %s\n", SDL_GetError());

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

  if (1 != 1 && spritePng != NULL) {
    SDL_RenderCopy(renderer, spritePng, NULL, NULL);
  } else {
    SDL_RenderCopy(renderer, texture, NULL, NULL);
  }
  SDL_RenderPresent(renderer);
  SDL_UpdateWindowSurface(window);
}

void luaopen_itsy (lua_State *L)
{
  lua_pushglobaltable(L);
  luaL_setfuncs(L, graphics, 0);

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

int sget(int x, int y)
{
  return x % 2 == 0
    ? memory[sprite[x][y]] & 0x0f
    : memory[sprite[x][y]] >> 4;
}



static void __sset(int x, int y, int c)
{
  memory[sprite[x][y]] = x % 2 == 0
    ? ((memory[sprite[x][y]] >> 4) << 4) | c
    : (c << 4) | (memory[sprite[x][y]] & 0x0f);
}

static void __pset(int x, int y, int c)
{
  memory[pixel[x][y]] = x % 2 == 0
    ? ((memory[pixel[x][y]] >> 4) << 4) | c
    : (c << 4) | (memory[pixel[x][y]] & 0x0f);
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

// https://en.wikipedia.org/wiki/Midpoint_circle_algorithm#C_example
static int lua_circ(lua_State *L)
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

// https://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#C
static int lua_line(lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_checknumber(L, 5);

  __line(x0, y0, x1, y1, col);

  return 0;
}

static int lua_pset(lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);
  int c = luaL_checknumber(L, 3);

  __pset(x, y, c);

  return 0;
}

static int lua_rect(lua_State *L)
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

static int lua_sspr(lua_State *L)
{
  int sx = luaL_checknumber(L, 1);
  int sy = luaL_checknumber(L, 2);
  int sw = luaL_checknumber(L, 3);
  int sh = luaL_checknumber(L, 4);
  int dx = luaL_checknumber(L, 5);
  int dy = luaL_checknumber(L, 6);
  int dw = luaL_checknumber(L, 7);
  int dh = luaL_checknumber(L, 8);

  for (int x = 0; x < sw; x++) {
    for (int y = 0; y < sh; y++) {
      int c = sget(sx + x, sy + y);
      __pset(dx + x, dy + y, c);
    }
  }

  return 0;
}

void getpixel(SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b)
{
  int bpp = surface->format->BytesPerPixel;
  Uint8 *p = (Uint8 *)surface->pixels + y * surface->pitch + x * bpp;
  if (bpp != 4) {
    printf("oh no not a good bpp that we know what to do with\n");
  }
  SDL_GetRGB(*(Uint32 *)p, surface->format, r, g, b);
}
