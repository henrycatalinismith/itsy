#include <stdio.h>
#include <stdbool.h>
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

#include "font.h"
#include "lua_stdlib.h"

uint8_t memory[0x8000];
int palette[16][3];
SDL_Window *window;
SDL_Renderer *renderer;
SDL_Texture *texture;
uint8_t pixels[128 * 128 * 4];

// optimization!! e.g. sprite[20][30] contains the address in memory of the
// spritesheet pixel at x=20 and y=30, to speed up reads & writes!
uint16_t sprite[128][128];
uint16_t pixel[128][128];

void getpixel(SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b);

int frame = 0;

int init_sdl(void);
int init_itsy(char *palettePng, char *spritesheetPng);
int init_lua(void);

void loop(void);
void render(void);

int peek(int addr);
void poke(int addr, int val);

int nibble(int addr, bool high);
void nobble(int addr, bool high, int val);

int pget(int x, int y);
int sget(int x, int y);

void pset(int x, int y, int c);
void sset(int x, int y, int c);

void line(int x0, int y0, int x1, int y1, int col);
void print(const char *str, int x, int y, int col);
void rect(int x0, int y0, int x1, int y1, int col);
void rectfill(int x0, int y0, int x1, int y1, int col);

int gfx_camera(lua_State *L);
int gfx_circ(lua_State *L);
int gfx_cls(lua_State *L);
int gfx_line(lua_State *L);
int gfx_print(lua_State *L);
int gfx_pset(lua_State *L);
int gfx_rect(lua_State *L);
int gfx_rectfill(lua_State *L);
int gfx_sspr(lua_State *L);

int mem_peek(lua_State *L);
int mem_poke(lua_State *L);

const luaL_Reg base[] = {
  {"pairs", luaB_print},
  // {"print", luaB_print},
  {"tonumber", luaB_tonumber},
  {"tostring", luaB_tostring},
  {"type", luaB_type},
  {NULL, NULL}
};

const luaL_Reg graphics[] = {
  {"camera", gfx_camera},
  {"circ", gfx_circ},
  {"cls", gfx_cls},
  {"line", gfx_line},
  {"print", gfx_print},
  {"pset", gfx_pset},
  {"rect", gfx_rect},
  {"rectfill", gfx_rectfill},
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

const luaL_Reg mem[] = {
  {"peek", mem_peek},
  {"poke", mem_poke},
  {NULL, NULL}
};

const luaL_Reg table[] = {
  {"add", tinsert},
  {"del", tremove},
  {NULL, NULL}
};

lua_State* lua;

int main(int argc, char **argv)
{
  char *code = argv[1];
  char *palettePng = argv[2];
  char *spritesheetPng = argv[3];

  if (init_sdl() != 0) {
    return -1;
  }

  if (init_itsy(palettePng, spritesheetPng) != 0) {
    return -1;
  }

  if (init_lua() != 0) {
    return -1;
  }

  luaL_dostring(lua, code);
  lua_getglobal(lua, "_init");
  lua_pcall(lua, 0, 0, 0);

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

int init_itsy(char *palettePng, char *spritesheetPng)
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
  unsigned char *img;
  SDL_RWops *a;
  SDL_Surface *image;
  Uint8 r, g, b;

  // -- palette

  img = b64_decode_ex(palettePng, strlen(palettePng), &decsize);
  a = SDL_RWFromConstMem(img, decsize);
  if (a == NULL) {
    printf("SDL_RWFromConstMem: %s\n", SDL_GetError());
    return -1;
  }
  image = IMG_LoadTyped_RW(a, 1, "PNG");
  if (!image) {
    printf("IMG_Load_RW: %s\n", IMG_GetError());
    return -1;
  }

  for (int y = 0; y < 4; y++) {
    for (int x = 0; x < 4; x++) {
      getpixel(image, x, y, &r, &g, &b);
      int c = x + (y * 4);
      printf("%d: rgb(%d,%d,%d)\n", c, r, g, b);
      palette[c][0] = r;
      palette[c][1] = g;
      palette[c][2] = b;
    }
  }

  // -- spritesheet

  img = b64_decode_ex(spritesheetPng, strlen(spritesheetPng), &decsize);
  a = SDL_RWFromConstMem(img, decsize);
  if (a == NULL) {
    printf("SDL_RWFromConstMem: %s\n", SDL_GetError());
    return -1;
  }
  image = IMG_LoadTyped_RW(a, 1, "PNG");
  if (!image) {
    printf("IMG_Load_RW: %s\n", IMG_GetError());
    return -1;
  }

  printf("%dx%d\n", image->w, image->h);
  printf("i have loaded a sprite omg\n");

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      bool found = false;
      int mindiff = 99999;
      int closest = 0;
      getpixel(image, x, y, &r, &g, &b);
      for (int c = 0; c < 16; c++) {
        int diff = (
          abs(r - palette[c][0]) +
          abs(g - palette[c][1]) +
          abs(b - palette[c][2])
        );
        if (diff < 200 && diff < mindiff) {
          mindiff = diff;
          closest = c;
          found = true;
        }
      }

      if (found) {
        sset(x, y, closest);
      } else {
        printf("sprite/palette mismatch @ %dx%d rgb(%d,%d,%d)\n", x, y, r, g, b);
      }
    }
  }

  // --

  return 0;
}

int init_lua()
{
  lua = luaL_newstate();

  lua_pushglobaltable(lua);
  luaL_setfuncs(lua, base, 0);

  lua_pushglobaltable(lua);
  luaL_setfuncs(lua, graphics, 0);

  lua_pushglobaltable(lua);
  luaL_setfuncs(lua, math, 0);

  lua_pushglobaltable(lua);
  luaL_setfuncs(lua, mem, 0);

  lua_pushglobaltable(lua);
  luaL_setfuncs(lua, table, 0);

  return 0;
}

void loop(void)
{
  render();
  frame++;
  // printf("loop: %s\n", SDL_GetError());

  lua_getglobal(lua, "_update");
  lua_pcall(lua, 0, 0, 0);

  lua_getglobal(lua, "_draw");
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
      pixels[ offset + 0 ] = palette[c][2];        // b
      pixels[ offset + 1 ] = palette[c][1];        // g
      pixels[ offset + 2 ] = palette[c][0];        // r
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

int peek(int addr)
{
  return memory[addr];
}

void poke(int addr, int val)
{
  memory[addr] = val;
}

int nibble(int addr, bool high)
{
  return high
    ? peek(addr) >> 4
    : peek(addr) & 0x0f;
}

void nobble(int addr, bool high, int val)
{
  poke(addr, high
    ? ((val << 4) | (peek(addr) & 0x0f))
    : (((peek(addr) >> 4) << 4) | val)
  );
}

int pget(int x, int y)
{
  if (x < 0 || y < 0 || x > 127 || y > 127) {
    return 0;
  }

  return nibble(pixel[x][y], x % 2 == 1);
}

int sget(int x, int y)
{
  return nibble(sprite[x][y], x % 2 == 1);
}

void sset(int x, int y, int c)
{
  nobble(sprite[x][y], x % 2 == 1, c);
}

void pset(int x, int y, int c)
{
  int cx = (peek(0x5f29) << 8) | peek(0x5f28);
  int cy = (peek(0x5f29) << 8) | peek(0x5f28);

  x -= cx;
  y -= cy;

  if (x < 0 || y < 0 || x > 127 || y > 127) {
    return;
  }

  nobble(pixel[x][y], x % 2 == 1, c);
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

void print(const char *str, int x, int y, int col)
{
  int len = strlen(str);
  for (int i = 0; i < len; i++) {
    int lx = x + (i * 4);
    int ly = y;

    for (int j = 0; j < 999; j++) {
      if (font[j].c == NULL) {
        break;
      }

      if (str[i] != font[j].c[0]) {
        continue;
      }

      for (int k = 0; k < 5; k++) {
        for (int l = 0; l < 3; l++) {
          if (font[j].px[k][l]) {
            pset(lx + l, ly + k, col);
          }
        }
      }
    }
  }
}

void rect(int x0, int y0, int x1, int y1, int col)
{
  line(x0, y0, x1, y0, col);
  line(x1, y0, x1, y1, col);
  line(x1, y1, x0, y1, col);
  line(x0, y1, x0, y0, col);
}

void rectfill(int x0, int y0, int x1, int y1, int col)
{
  for (int y = y0; y < y1; y++) {
    line(x0, y, x1, y, col);
  }
}

int gfx_camera(lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);

  poke(0x5f28, x & 0xff);
  poke(0x5f29, x >> 8);

  poke(0x5f2a, y & 0xff);
  poke(0x5f2b, y >> 8);

  return 0;
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

int gfx_cls(lua_State *L)
{
  int argc = lua_gettop(L);
  int color = 0;
  if (argc > 0) {
    color = luaL_checknumber(L, 1);
  }

  rectfill(0, 0, 128, 128, color);

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

int gfx_print(lua_State *L)
{
  const char *str = luaL_checkstring(L, 1);
  int x = luaL_checknumber(L, 2);
  int y = luaL_checknumber(L, 3);
  int col = luaL_checknumber(L, 4);

  print(str, x, y, col);

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

  rect(x0, y0, x1, y1, col);

  return 0;
}

int gfx_rectfill(lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_checknumber(L, 5);

  rectfill(x0, y0, x1, y1, col);

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

int mem_peek(lua_State *L)
{
  int addr = luaL_checknumber(L, 1);

  lua_pushnumber(L, peek(addr));

  return 1;
}

int mem_poke(lua_State *L)
{
  int addr = luaL_checknumber(L, 1);
  int val = luaL_checknumber(L, 2);

  poke(addr, val);

  return 0;
}

void getpixel(SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b)
{
  int bpp = surface->format->BytesPerPixel;
  Uint8 *p = (Uint8 *)surface->pixels + y * surface->pitch + x * bpp;

  Uint32 pixel;

  switch(bpp) {
    case 1:
      pixel = *p;
      break;

    case 2:
      pixel = *(Uint16 *)p;
      break;

    case 3:
      if(SDL_BYTEORDER == SDL_BIG_ENDIAN) {
        pixel = p[0] << 16 | p[1] << 8 | p[2];
      } else {
        pixel = p[0] | p[1] << 8 | p[2] << 16;
      }
      break;

    case 4:
      pixel = *(Uint32 *)p;
      break;

    default:
      return;
  }

  SDL_GetRGB(pixel, surface->format, r, g, b);

}

