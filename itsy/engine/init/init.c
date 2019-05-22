#include <stdbool.h>
#include <time.h>

#include <b64.h>

#include <lua/lua.h>
#include <lua/lauxlib.h>
#include <lua/lualib.h>

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>


#include <engine/init/init.h>
// #include <engine/error/error.h>
#include <engine/memory/addresses.h>
#include <engine/state/state.h>

#include <functions/abs/abs.h>
#include <functions/add/add.h>
#include <functions/camera/camera.h>
#include <functions/ceil/ceil.h>
#include <functions/circ/circ.h>
#include <functions/circfill/circfill.h>
#include <functions/cls/cls.h>
#include <functions/cocreate/cocreate.h>
#include <functions/color/color.h>
#include <functions/coresume/coresume.h>
#include <functions/cos/cos.h>
#include <functions/costatus/costatus.h>
#include <functions/del/del.h>
#include <functions/flr/flr.h>
#include <functions/line/line.h>
#include <functions/lower/lower.h>
#include <functions/max/max.h>
#include <functions/min/min.h>
#include <functions/nibble/nibble.h>
#include <functions/nobble/nobble.h>
#include <functions/pairs/pairs.h>
#include <functions/poke/poke.h>
#include <functions/peek/peek.h>
#include <functions/print/print.h>
#include <functions/pget/pget.h>
#include <functions/pset/pset.h>
#include <functions/rect/rect.h>
#include <functions/rectfill/rectfill.h>
#include <functions/rnd/rnd.h>
#include <functions/sget/sget.h>
#include <functions/sin/sin.h>
#include <functions/sset/sset.h>
#include <functions/sspr/sspr.h>
#include <functions/sub/sub.h>
#include <functions/tan/tan.h>
#include <functions/time/time.h>
#include <functions/tonum/tonum.h>
#include <functions/tostr/tostr.h>
#include <functions/touch/touch.h>
#include <functions/touchx/touchx.h>
#include <functions/touchy/touchy.h>
#include <functions/type/type.h>
#include <functions/upper/upper.h>
#include <functions/yield/yield.h>

#define min(a,b) (((a) < (b)) ? (a) : (b))

int init_itsy (char *palettePng, char *spritesheetPng);
lua_State* init_lua (lua_State *L);
int init_sdl (int canvasWidth, int canvasHeight);
void getpixel (SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b);

const luaL_Reg itsy_functions[] = {
  {"abs", itsy_abs},
  {"add", itsy_add},
  {"camera", itsy_camera},
  {"ceil", itsy_ceil},
  {"circ", itsy_circ},
  {"circfill", itsy_circfill},
  {"cls", itsy_cls},
  {"cocreate", itsy_cocreate},
  {"color", itsy_color},
  {"coresume", itsy_coresume},
  {"cos", itsy_cos},
  {"costatus", itsy_costatus},
  {"del", itsy_del},
  {"flr", itsy_flr},
  {"line", itsy_line},
  {"lower", itsy_lower},
  {"max", itsy_max},
  {"min", itsy_min},
  {"pairs", itsy_pairs},
  {"peek", itsy_peek},
  {"poke", itsy_poke},
  {"print", itsy_print},
  {"pset", itsy_pset},
  {"rect", itsy_rect},
  {"rectfill", itsy_rectfill},
  {"rnd", itsy_rnd},
  {"sin", itsy_sin},
  {"sspr", itsy_sspr},
  {"sub", itsy_sub},
  {"tan", itsy_tan},
  {"time", itsy_time},
  {"tonum", itsy_tonum},
  {"tostr", itsy_tostr},
  {"touch", itsy_touch},
  {"touchx", itsy_touchx},
  {"touchy", itsy_touchy},
  {"type", itsy_type},
  {"upper", itsy_upper},
  {"yield", itsy_yield},
};

bool init (int argc, char **argv)
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
    return false;
  }

  if (init_itsy(palettePng, spritesheetPng) != 0) {
    return false;
  }

  itsy.lua = init_lua(itsy.lua);
  itsy.debugger = init_lua(itsy.debugger);

  lua_pushstring(itsy.debugger, code);
  lua_setfield(itsy.debugger, -2, "lua");

  if (luaL_dostring(itsy.lua, code) != 0) {
    // runtime_error(itsy.lua);
    return false;
  }

  lua_getglobal(itsy.lua, "_init");
  if (lua_isfunction(itsy.lua, -1) && lua_pcall(itsy.lua, 0, 0, 0) != 0) {
    // runtime_error(itsy.lua);
    return false;
  }

  return true;
}

int init_itsy (char *palettePng, char *spritesheetPng)
{
  srand((unsigned) time(NULL));

  for (int addr = 0x6000; addr <= 0x7FFF; addr++) {
    itsy.memory[addr] = 0;
  }

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      itsy.sprite_address[x][y] = 0x0000 + (y * 64) + floor(x / 2);
      itsy.screen_address[x][y] = 0x6000 + (y * 64) + floor(x / 2);
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
    // printf("SDL_RWFromConstMem: %s\n", SDL_GetError());
    return -1;
  }
  image = IMG_LoadTyped_RW(a, 1, "PNG");
  if (!image) {
    // printf("IMG_Load_RW: %s\n", IMG_GetError());
    return -1;
  }

  for (int y = 0; y < 4; y++) {
    for (int x = 0; x < 4; x++) {
      getpixel(image, x, y, &r, &g, &b);
      int c = x + (y * 4);
      // printf("%d: rgb(%d,%d,%d)\n", c, r, g, b);
      itsy.palette[c][0] = r;
      itsy.palette[c][1] = g;
      itsy.palette[c][2] = b;
    }
  }

  // -- spritesheet

  img = b64_decode_ex(spritesheetPng, strlen(spritesheetPng), &decsize);
  a = SDL_RWFromConstMem(img, decsize);
  if (a == NULL) {
    // printf("SDL_RWFromConstMem: %s\n", SDL_GetError());
    return -1;
  }
  image = IMG_LoadTyped_RW(a, 1, "PNG");
  if (!image) {
    // printf("IMG_Load_RW: %s\n", IMG_GetError());
    return -1;
  }

  // printf("%dx%d\n", image->w, image->h);
  // printf("i have loaded a sprite omg\n");

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      bool found = false;
      int mindiff = 99999;
      int closest = 0;
      getpixel(image, x, y, &r, &g, &b);
      for (int c = 0; c < 16; c++) {
        int diff = (
          abs(r - itsy.palette[c][0]) +
          abs(g - itsy.palette[c][1]) +
          abs(b - itsy.palette[c][2])
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

  return 0;
}

lua_State* init_lua (lua_State *L)
{
  L = luaL_newstate();

  lua_pushglobaltable(L);
  luaL_setfuncs(L, itsy_functions, 0);

  return L;
}

int init_sdl (int canvasWidth, int canvasHeight)
{
  if (SDL_Init(SDL_INIT_VIDEO) != 0) {
    SDL_Log("SDL_Init: %s", SDL_GetError());
    return 1;
  }

  int size = min(canvasWidth, canvasHeight);
  itsy.scale = size / 128;

  itsy.src.x = 0;
  itsy.src.y = 0;
  itsy.src.w = 128;
  itsy.src.h = 128;

  itsy.dst.x = canvasWidth > canvasHeight
    ? (canvasWidth - canvasHeight) / 2
    : 0;
  itsy.dst.y = canvasHeight > canvasWidth
    ? (canvasHeight - canvasWidth) / 2
    : 0;
  itsy.dst.w = size;
  itsy.dst.h = size;

  double m = (double) 128 / size;
  // printf("i%d j%d k%d l%f\n", canvasWidth, canvasHeight, size, m);
  int width = ceil(canvasWidth * m);
  int height = ceil(canvasHeight * m);
  // printf("w%d h%d\n", width, height);
  // printf("x%d y%d\n", itsy.x, itsy.y);

  SDL_Window *w;
  SDL_Renderer *r;

  if (SDL_CreateWindowAndRenderer(canvasWidth, canvasHeight, SDL_SWSURFACE, &w, &r) != 0) {
    SDL_Log("SDL_CreateWindowAndRenderer: %s", SDL_GetError());
    return 1;
  }

  itsy.window = w;
  itsy.renderer = r;
  itsy.canvas = SDL_CreateTexture(
    itsy.renderer,
    SDL_PIXELFORMAT_ARGB8888,
    SDL_TEXTUREACCESS_STREAMING,
    canvasWidth,
    canvasHeight
  );

  if (itsy.canvas == NULL) {
    SDL_Log("SDL_CreateTexture: %s", SDL_GetError());
    return 1;
  }

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
