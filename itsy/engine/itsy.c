#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>

#include <emscripten.h>

#include <b64.h>

#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

#include "itsy.h"
#include "font.h"
#include "luahack.h"

#include "abs/abs.h"
#include "add/add.h"
#include "camera/camera.h"
#include "ceil/ceil.h"
#include "circ/circ.h"
#include "circfill/circfill.h"
#include "cls/cls.h"
#include "line/line.h"
#include "nobble/nobble.h"
#include "poke/poke.h"
#include "peek/peek.h"
#include "pset/pset.h"
#include "rectfill/rectfill.h"

#define min(a,b) (((a) < (b)) ? (a) : (b))

uint8_t memory[0x8000];
uint16_t sprite[128][128];
uint16_t pixel[128][128];

typedef struct itsy_sdl_context {
  SDL_Window *window;
  SDL_Renderer *renderer;
  SDL_Texture *canvas;
  SDL_Rect src;
  SDL_Rect dst;
  double scale;
  int x;
  int y;
} itsy_sdl_context;

typedef struct itsy_input_state {
  bool touch;
  int touchx;
  int touchy;
} itsy_input_state;

itsy_sdl_context *sdl;
itsy_input_state input = { false, 0, 0 };

int palette[16][3];
uint8_t pixels[128 * 128 * 4];
bool error = false;

void getpixel(SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b);

int frame = 0;

int init_sdl(int canvasWidth, int canvasHeight);
int init_itsy(char *palettePng, char *spritesheetPng);
lua_State* init_lua(lua_State *L);

void loop(void);
void render(void);

int nibble(int addr, bool high);

int pget(int x, int y);
int sget(int x, int y);

void sset(int x, int y, int c);

void print(const char *str, int x, int y, int col);
void rect(int x0, int y0, int x1, int y1, int col);

lua_State* runtime;
lua_State* debugger;

int draw_print(lua_State *L);
int draw_rect(lua_State *L);
int draw_sspr(lua_State *L);

int gfx_color(lua_State *L);

int input_touch(lua_State *L);
int input_touchx(lua_State *L);
int input_touchy(lua_State *L);

int misc_time(lua_State *L);

void runtime_error(lua_State *L);

const luaL_Reg base[] = {
  // {"print", luaB_print},
  {"time", misc_time},
  {"tonum", luaB_tonumber},
  {"tostr", luaB_tostring},
  {"type", luaB_type},
  {NULL, NULL}
};

const luaL_Reg coroutines[] = {
  {"cocreate", luaB_cocreate},
  {"coresume", luaB_coresume},
  {"costatus", luaB_costatus},
  {"yield", luaB_yield},
  {NULL, NULL}
};

const luaL_Reg draw_funcs[] = {
  {"circ", itsy_circ},
  {"circfill", itsy_circfill},
  {"cls", itsy_cls},
  {"line", itsy_line},
  {"print", draw_print},
  {"pset", itsy_pset},
  {"rect", draw_rect},
  {"rectfill", itsy_rectfill},
  {"sspr", draw_sspr},
  {NULL, NULL}
};

const luaL_Reg graphics[] = {
  {"camera", itsy_camera},
  {"color", gfx_color},
  {NULL, NULL}
};

const luaL_Reg input_funcs[] = {
  {"touch", input_touch},
  {"touchx", input_touchx},
  {"touchy", input_touchy},
  {NULL, NULL}
};

const luaL_Reg math[] = {
  {"abs", itsy_abs},
  {"ceil", itsy_ceil},
  {"cos", math_cos},
  {"flr", math_floor},
  {"max", math_max},
  {"min", math_min},
  {"rnd", math_random},
  {"sin", math_sin},
  {"tan", math_tan},
  {NULL, NULL}
};

const luaL_Reg mem[] = {
  {"peek", itsy_peek},
  {"poke", itsy_poke},
  {NULL, NULL}
};

const luaL_Reg string_funcs[] = {
  {"lower", str_lower},
  {"sub", str_sub},
  {"upper", str_upper},
  {NULL, NULL}
};

const luaL_Reg table[] = {
  {"add", itsy_add},
  {"del", tremove},
  {"pairs", luaB_pairs},
  {NULL, NULL}
};

int main(int argc, char **argv)
{
  char *code = argv[1];
  char *palettePng = argv[2];
  char *spritesheetPng = argv[3];

  int canvasWidth;
  int canvasHeight;
  printf("4: %s\n", argv[4]);
  sscanf(argv[4], "%d", &canvasWidth);
  sscanf(argv[5], "%d", &canvasHeight);

  if (init_sdl(canvasWidth, canvasHeight) != 0) {
    return -1;
  }

  if (init_itsy(palettePng, spritesheetPng) != 0) {
    return -1;
  }

  runtime = init_lua(runtime);
  debugger = init_lua(debugger);

  lua_pushstring(debugger, code);
  lua_setfield(debugger, -2, "lua");

  if (luaL_dostring(runtime, code) != 0) {
    runtime_error(runtime);
    return -1;
  }

  lua_getglobal(runtime, "_init");
  if (lua_isfunction(runtime, -1) && lua_pcall(runtime, 0, 0, 0) != 0) {
    runtime_error(runtime);
    return -1;
  }

  lua_getglobal(runtime, "_tick");
  int has_tick = lua_isfunction(runtime, -1);
  lua_getglobal(runtime, "_draw");
  int has_draw = lua_isfunction(runtime, -1);

  if (has_tick || has_draw) {
    emscripten_set_main_loop(loop, -1, 1);
  } else {
    render();
  }

  return 0;
}

int init_sdl(int canvasWidth, int canvasHeight)
{
  if (SDL_Init(SDL_INIT_VIDEO) != 0) {
    SDL_Log("SDL_Init: %s", SDL_GetError());
    return 1;
  }

  int size = min(canvasWidth, canvasHeight);
  sdl->scale = size / 128;
  sdl->x = ceil((canvasWidth - size) / 2);
  sdl->y = ceil((canvasHeight - size) / 2);

  sdl->src.x = 0;
  sdl->src.y = 0;
  sdl->src.w = 128;
  sdl->src.h = 128;


  sdl->dst.x = canvasWidth > canvasHeight
    ? (canvasWidth - canvasHeight) / 2
    : 0;
  sdl->dst.y = canvasHeight > canvasWidth
    ? (canvasHeight - canvasWidth) / 2
    : 0;
  sdl->dst.w = size;
  sdl->dst.h = size;

  double m = (double) 128 / size;
  printf("i%d j%d k%d l%f\n", canvasWidth, canvasHeight, size, m);
  int width = ceil(canvasWidth * m);
  int height = ceil(canvasHeight * m);
  printf("w%d h%d\n", width, height);
  printf("x%d y%d\n", sdl->x, sdl->y);

  SDL_Window *w;
  SDL_Renderer *r;

  if (SDL_CreateWindowAndRenderer(canvasWidth, canvasHeight, SDL_SWSURFACE, &w, &r) != 0) {
    SDL_Log("SDL_CreateWindowAndRenderer: %s", SDL_GetError());
    return 1;
  }

  sdl->window = w;
  sdl->renderer = r;
  sdl->canvas = SDL_CreateTexture(
    sdl->renderer,
    SDL_PIXELFORMAT_ARGB8888,
    SDL_TEXTUREACCESS_STREAMING,
    canvasWidth,
    canvasHeight
  );

  if (sdl->canvas == NULL) {
    SDL_Log("SDL_CreateTexture: %s", SDL_GetError());
    return 1;
  }

  return 0;
}

int init_itsy(char *palettePng, char *spritesheetPng)
{
  srand((unsigned) time(NULL));

  for (int addr = 0x6000; addr <= 0x7FFF; addr++) {
    memory[addr] = 0;
  }

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      sprite[x][y] = 0x0000 + (y * 64) + floor(x / 2);
      pixel[x][y] = 0x6000 + (y * 64) + floor(x / 2);
    }
  }

  poke(DRAW_COLOR, 6);

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

lua_State* init_lua(lua_State *L)
{
  L = luaL_newstate();

  lua_pushglobaltable(L);
  luaL_setfuncs(L, base, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, coroutines, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, draw_funcs, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, graphics, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, input_funcs, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, math, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, mem, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, string_funcs, 0);

  lua_pushglobaltable(L);
  luaL_setfuncs(L, table, 0);

  return L;
}

bool upagain = false;

void loop(void)
{
  SDL_Event event;
  bool down = false;

  if (upagain) {
    input.touch = false;
    input.touchx = 0;
    input.touchy = 0;
    upagain = false;
  }

  while (SDL_PollEvent(&event)) {
    switch (event.type) {
      //case SDL_FINGERDOWN:
        //printf("finger %d, %d\n", (int)event.tfinger.x, (int)event.tfinger.y);
        //break;

      //case SDL_FINGERUP:
        //printf("SDL_FINGERUP\n");
        //break;

      case SDL_MOUSEBUTTONDOWN:
        printf("mouse %d, %d\n", event.button.x, event.button.y);
        input.touch = true;
        input.touchx = floor(
          (event.motion.x - sdl->dst.x) / sdl->scale
        );
        input.touchy = floor(
          (event.motion.y - sdl->dst.y) / sdl->scale
        );
        down = true;
        break;

      case SDL_MOUSEBUTTONUP:
        printf("SDL_MOUSEBUTTONUP\n");
        if (down) {
          upagain = true;
        } else {
          input.touch = false;
          input.touchx = 0;
          input.touchy = 0;
        }
        break;

      //case SDL_FINGERMOTION:
        //printf("SDL_FINGERMOTION\n");
        //break;

      case SDL_MOUSEMOTION:
        //printf("SDL_MOUSEMOTION\n");
        if (input.touch) {
          input.touchx = floor(
            (event.motion.x - sdl->dst.x) / sdl->scale
          );
          input.touchy = floor(
            (event.motion.y - sdl->dst.y) / sdl->scale
          );
        }
        break;
    }
  }

  lua_getglobal(runtime, "_tick");
  if (lua_isfunction(runtime, -1) && lua_pcall(runtime, 0, 0, 0) != 0) {
    runtime_error(runtime);
    return;
  }

  lua_getglobal(runtime, "_draw");
  if (lua_isfunction(runtime, -1) && lua_pcall(runtime, 0, 0, 0) != 0) {
    runtime_error(runtime);
    return;
  }

  if (error == true || frame > 10000) {
    emscripten_cancel_main_loop();
  }


  render();
  frame++;
  // printf("loop: %s\n", SDL_GetError());
}

void render(void)
{
  SDL_SetRenderDrawColor(sdl->renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(sdl->renderer);

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
    sdl->canvas,
    NULL,
    &pixels[0],
    128 * 4
  );

  // printf("Frame: %d\n", frame);

  SDL_RenderCopy(sdl->renderer, sdl->canvas, &sdl->src, &sdl->dst);
  // SDL_RenderCopy(sdl->renderer, sdl->canvas, &sdl->src, NULL);
  SDL_RenderPresent(sdl->renderer);
  SDL_UpdateWindowSurface(sdl->window);
}

int nibble(int addr, bool high)
{
  return high
    ? peek(addr) >> 4
    : peek(addr) & 0x0f;
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

int draw_print(lua_State *L)
{
  const char *str = luaL_optstring(L, 1, "");
  int x = luaL_optinteger(L, 2, peek(DRAW_PRINT_X));
  int y = luaL_optinteger(L, 3, peek(DRAW_PRINT_Y));
  int col = luaL_optinteger(L, 4, peek(DRAW_COLOR));

  print(str, x, y, col);
  poke(DRAW_PRINT_X, x);
  poke(DRAW_PRINT_Y, y + 8);

  return 0;
}

int draw_rect(lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_optinteger(L, 5, peek(DRAW_COLOR));

  rect(x0, y0, x1, y1, col);

  return 0;
}

int draw_sspr(lua_State *L)
{
  int sx = luaL_checknumber(L, 1);
  int sy = luaL_checknumber(L, 2);
  int sw = luaL_checknumber(L, 3);
  int sh = luaL_checknumber(L, 4);
  int dx = luaL_checknumber(L, 5);
  int dy = luaL_checknumber(L, 6);

  for (int x = 0; x < sw; x++) {
    for (int y = 0; y < sh; y++) {
      int c = sget(sx + x, sy + y);
      if (c != 0) {
        pset(dx + x, dy + y, c);
      }
    }
  }

  return 0;
}

int gfx_color(lua_State *L)
{
  int col = luaL_checknumber(L, 1);

  poke(DRAW_COLOR, col);

  return 0;
}

int input_touch(lua_State *L)
{
  lua_pushboolean(L, input.touch);
  return 1;
}

int input_touchx(lua_State *L)
{
  if (input.touch) {
    lua_pushnumber(L, input.touchx);
  } else {
    lua_pushnil(L);
  }
  return 1;
}

int input_touchy(lua_State *L)
{
  if (input.touch) {
    lua_pushnumber(L, input.touchy);
  } else {
    lua_pushnil(L);
  }
  return 1;
}

int misc_time(lua_State *L)
{
  double diff = (double) SDL_GetTicks() / 1000;
  lua_pushnumber(L, diff);
  return 1;
}

void runtime_error(lua_State *L)
{
  const char *msg = lua_tostring(L, -1);
  printf("error error lololol\n");
  printf("%s\n", msg);

  rectfill(0, 0, 128, 128, 0);
  print(msg, 0, 0, 7);

  char *debug =
    "last = nil\n"
    "j = 0\n"
    "linenr = nil\n"
    "msg = ''\n"
    "msglines = {}\n"
    "for i = 1, #error do\n"
    "  char = sub(error, i, i)\n"
    "  if char == ' ' and last == ':' then\n"
    "    j = 1\n"
    "    lchars = ''\n"
    "    for k = i-2,1,-1 do\n"
    "      lchr = sub(error, k, k)\n"
    "      --print(lchr, 6*(k+1), 1, 7)\n"
    "      if lchr == ':' then\n"
    "        break\n"
    "      else\n"
    "        lchars = lchr .. lchars\n"
    "      end\n"
    "    end\n"
    "    linenr = tonum(lchars) - 1\n"
    "    --print('(' .. linenr .. ')', 1, 120, 5)\n"
    "  end\n"
    "  if j > 0 then\n"
    "    if j > 1 then\n"
    "      msg = msg .. char\n"
    "    end\n"
    "    j = j + 1\n"
    "    if #msg == 28 then\n"
    "      add(msglines, msg)\n"
    "      msg = ''\n"
    "    end\n"
    "  end\n"
    "  last = char\n"
    "end\n"
    "if #msg > 0 then\n"
    "  add(msglines, msg)\n"
    "end\n"
    "\n"
    "--print(#msglines, 120, 120, 11)\n"
    "for i,line in pairs(msglines) do\n"
    "  --print(line, 4, 4 + (i * 6), 12)\n"
    "end\n"
    "--print(lua, 4, 32, 11)\n"
    "i = 0\n"
    "lines = {}\n"
    "curr = 1\n"
    "lstr = ''\n"
    "for i = 1, #lua do\n"
    "  char = sub(lua, i, i)\n"
    "  --print(char, i * 6, 48, 12)\n"
    "  if char == \"\\n\" then\n"
    "    --print(lstr, 4, 48 + (curr * 6), 13)\n"
    "    curr = curr + 1\n"
    "    add(lines, lstr)\n"
    "    lstr = ''\n"
    "  else\n"
    "    lstr = lstr .. char\n"
    "  end\n"
    "end\n"
    "add(lines, lstr)\n"
    "del(lines, 1)\n"
    "rectfill(0, 0, 127, 16, 14)\n"
    "print('ERROR ON LINE ' .. linenr, 4, 8, 2)\n"
    "startline = max(linenr - 3, 1)\n"
    "endline = min(startline + 8, #lines)\n"
    "l = 0\n"
    "line(0, 16, 127, 16, 2)\n"
    "rectfill(0, 17, 127, 81, 7)\n"
    "line(0, 81, 127, 81, 2)\n"
    "rectfill(0, 82, 127, 127, 14)\n"
    "for i = startline,endline do\n"
    "  y = 17 + (l * 7)\n"
    "  if i == linenr then\n"
    "    rectfill(0, y, 127, y + 7, 8)\n"
    "    fg = 7\n"
    "  else\n"
    "    fg = 14\n"
    "  end\n"
    "  print(lines[i], 4, y + 1, fg)\n"
    "  l = l + 1\n"
    "end\n"
    "for i,line in pairs(msglines) do\n"
    "  print(upper(line), 4, 84 + ((i-1) * 8), 2)\n"
    "end\n"

  ;

  lua_pushstring(debugger, msg);
  lua_setfield(debugger, -2, "error");

  luaL_dostring(debugger, debug);

  luaL_traceback(L, L, NULL, 1);
  printf("%s\n", lua_tostring(L, -1));

  render();
  error = true;
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

