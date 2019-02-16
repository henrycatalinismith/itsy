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
uint8_t pixels[128 * 128 * 4];

// optimization!! e.g. sprite[20][30] contains the address in memory of the
// spritesheet pixel at x=20 and y=30, to speed up reads & writes!
uint16_t sprite[128][128];
uint16_t pixel[128][128];

void getpixel(SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b);

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

int init_sdl(void);
int init_itsy(char *spritesheet);

void loop(void);
void render(void);

int pget(int x, int y);
int sget(int x, int y);

void pset(int x, int y, int c);
void sset(int x, int y, int c);

void line(int x0, int y0, int x1, int y1, int col);

int luaB_pairs (lua_State *L);
int luaB_print (lua_State *L);
int luaB_tonumber (lua_State *L);
int luaB_tostring (lua_State *L);
int luaB_type (lua_State *L);

int gfx_circ(lua_State *L);
int gfx_line(lua_State *L);
int gfx_pset(lua_State *L);
int gfx_rect(lua_State *L);
int gfx_sspr(lua_State *L);

int math_abs (lua_State *L);
int math_ceil (lua_State *L);
int math_floor (lua_State *L);
int math_max (lua_State *L);
int math_min (lua_State *L);
int math_pow (lua_State *L);
int math_random (lua_State *L);

const luaL_Reg base[] = {
  {"pairs", luaB_print},
  {"print", luaB_print},
  {"tonumber", luaB_tonumber},
  {"tostring", luaB_tostring},
  {"type", luaB_type},
  {NULL, NULL}
};

const luaL_Reg graphics[] = {
  {"circ", gfx_circ},
  {"line", gfx_line},
  {"pset", gfx_pset},
  {"rect", gfx_rect},
  {"sspr", gfx_sspr},
  {NULL, NULL}
};

const luaL_Reg math[] = {
  {"abs", math_abs},
  {"ceil", math_ceil},
  {"flr", math_floor},
  {"max", math_max},
  {"min", math_min},
  {"pow", math_pow},
  {"rnd", math_random},
  {NULL, NULL}
};

void luaopen_itsy (lua_State *L);

lua_State* lua;

SDL_Texture *spritePng;

int main(int argc, char **argv)
{
  char *code = argv[1];

  if (init_sdl() != 0) {
    return -1;
  }

  if (init_itsy(argv[2]) != 0) {
    return -1;
  }

  lua = luaL_newstate();
  luaopen_itsy(lua);

  luaL_dostring(lua, code);
  emscripten_set_main_loop(loop, -1, 1);

  return 0;
}

int init_sdl(void)
{
  if (SDL_Init(SDL_INIT_VIDEO) != 0) {
    SDL_Log("SDL_Init: %s", SDL_GetError());
    return 1;
  }

  if (SDL_CreateWindowAndRenderer(128, 128, 0, &window, &renderer) != 0) {
    SDL_Log("SDL_CreateWindowAndRenderer: %s", SDL_GetError());
    return 1;
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

  return 0;
}

int init_itsy(char *spritesheet)
{
  for (int addr = 0x6000; addr <= 0x7FFF; addr++) {
    memory[addr] = 0;
  }

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      sprite[x][y] = 0x0000 + (y * 64) + floor(x / 2);
      pixel[x][y] = 0x6000 + (y * 64) + floor(x / 2);
    }
  }

  unsigned long decsize;
  unsigned char *img = b64_decode_ex(spritesheet, strlen(spritesheet), &decsize);

  SDL_RWops *a = SDL_RWFromConstMem(img, decsize);
  if (a == NULL) {
    printf("SDL_RWFromConstMem: %s\n", SDL_GetError());
    return -1;
  }

  SDL_Surface *image = IMG_LoadTyped_RW(a, 1, "PNG");
  if (!image) {
    printf("IMG_Load_RW: %s\n", IMG_GetError());
    return -1;
  }

  printf("%dx%d\n", image->w, image->h);

  spritePng = SDL_CreateTextureFromSurface(renderer, image);
  if (!spritePng) {
    printf("SDL_CreateTextureFromSurface: %s\n", SDL_GetError());
    return -1;
  }

  printf("i have loaded a sprite omg\n");

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      Uint8 r, g, b;
      getpixel(image, x, y, &r, &g, &b);

      for (int c = 0; c < 16; c++) {
        if (colors[c][0] == r && colors[c][1] == g && colors[c][2] == b) {
          // printf("%d %d %d %d %d\n", x, y, r, g, b);
          // 👆 this is printing on every pixel so the sprite must be loading
          sset(x, y, c);
        }
      }
    }
  }

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
  luaL_setfuncs(L, base, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, graphics, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, math, 0);
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

void sset(int x, int y, int c)
{
  memory[sprite[x][y]] = x % 2 == 0
    ? ((memory[sprite[x][y]] >> 4) << 4) | c
    : (c << 4) | (memory[sprite[x][y]] & 0x0f);
}

void pset(int x, int y, int c)
{
  memory[pixel[x][y]] = x % 2 == 0
    ? ((memory[pixel[x][y]] >> 4) << 4) | c
    : (c << 4) | (memory[pixel[x][y]] & 0x0f);
}

// https://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#C
void line(int x0, int y0, int x1, int y1, int col)
{
  int dx = abs(x1 - x0);
  int dy = abs(y1 - y0);
  int sy = y0 < y1 ? 1 : -1;
  int sx = x0 < x1 ? 1 : -1;
  int err = (dx > dy ? dx : -dy) / 2;

  for (;;) {
    pset(x0, y0, col);

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
int gfx_circ(lua_State *L)
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
    pset(x + cx, y + cy, c);
    pset(x + cy, y + cx, c);
    pset(x - cy, y + cx, c);
    pset(x - cx, y + cy, c);
    pset(x - cx, y - cy, c);
    pset(x - cy, y - cx, c);
    pset(x + cy, y - cx, c);
    pset(x + cx, y - cy, c);

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

int gfx_line(lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_checknumber(L, 5);

  line(x0, y0, x1, y1, col);

  return 0;
}

int gfx_pset(lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);
  int c = luaL_checknumber(L, 3);

  pset(x, y, c);

  return 0;
}

int gfx_rect(lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_checknumber(L, 5);

  line(x0, y0, x1, y0, col);
  line(x1, y0, x1, y1, col);
  line(x1, y1, x0, y1, col);
  line(x0, y1, x0, y0, col);

  return 0;
}

int gfx_sspr(lua_State *L)
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
      pset(dx + x, dy + y, c);
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
