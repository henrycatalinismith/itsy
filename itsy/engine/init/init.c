#include <time.h>

#include <b64.h>

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

#include <init/init.h>
#include <sdl/sdl.h>

#include <abs/abs.h>
#include <add/add.h>
#include <camera/camera.h>
#include <ceil/ceil.h>
#include <circ/circ.h>
#include <circfill/circfill.h>
#include <cls/cls.h>
#include <cocreate/cocreate.h>
#include <color/color.h>
#include <coresume/coresume.h>
#include <cos/cos.h>
#include <costatus/costatus.h>
#include <del/del.h>
#include <flr/flr.h>
#include <line/line.h>
#include <lower/lower.h>
#include <max/max.h>
#include <min/min.h>
#include <nibble/nibble.h>
#include <nobble/nobble.h>
#include <pairs/pairs.h>
#include <poke/poke.h>
#include <peek/peek.h>
#include <print/print.h>
#include <pget/pget.h>
#include <pset/pset.h>
#include <rect/rect.h>
#include <rectfill/rectfill.h>
#include <rnd/rnd.h>
#include <sget/sget.h>
#include <sin/sin.h>
#include <sset/sset.h>
#include <sspr/sspr.h>
#include <sub/sub.h>
#include <tan/tan.h>
#include <time/time.h>
#include <tonum/tonum.h>
#include <tostr/tostr.h>
#include <touch/touch.h>
#include <touchx/touchx.h>
#include <touchy/touchy.h>
#include <type/type.h>
#include <upper/upper.h>
#include <yield/yield.h>

#define min(a,b) (((a) < (b)) ? (a) : (b))

void getpixel(SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b);

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

int init_itsy (char *palettePng, char *spritesheetPng)
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
      palette[c][0] = r;
      palette[c][1] = g;
      palette[c][2] = b;
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
  // printf("i%d j%d k%d l%f\n", canvasWidth, canvasHeight, size, m);
  int width = ceil(canvasWidth * m);
  int height = ceil(canvasHeight * m);
  // printf("w%d h%d\n", width, height);
  // printf("x%d y%d\n", sdl->x, sdl->y);

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
