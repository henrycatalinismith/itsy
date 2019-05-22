#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>

#include <emscripten.h>

#include <b64.h>

#include <lua/lua.h>
#include <lua/lauxlib.h>
#include <lua/lualib.h>

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

#include <engine/init/init.h>
#include <engine/draw/draw.h>
#include <engine/error/error.h>
#include <engine/memory/addresses.h>
#include <engine/memory/optimizations.h>
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

itsy_engine_state itsy;

uint16_t sprite[128][128];
uint16_t pixel[128][128];

void loop(void);

int main (int argc, char **argv)
{
  if (!init(argc, argv)) {
    error();
    return -1;
  }

  lua_getglobal(itsy.lua, "_tick");
  int has_tick = lua_isfunction(itsy.lua, -1);
  lua_getglobal(itsy.lua, "_draw");
  int has_draw = lua_isfunction(itsy.lua, -1);

  if (has_tick || has_draw) {
    emscripten_set_main_loop(loop, -1, 1);
  } else {
    draw();
  }

  return 0;
}

bool upagain = false;

void loop(void)
{
  SDL_Event event;
  bool down = false;

  if (upagain) {
    poke(TOUCH_0_B, false);
    poke(TOUCH_0_X, 0);
    poke(TOUCH_0_Y, 0);
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
        poke(TOUCH_0_B, true);
        poke(TOUCH_0_X, floor(
          (event.motion.x - itsy.dst.x) / itsy.scale
        ));
        poke(TOUCH_0_Y, floor(
          (event.motion.y - itsy.dst.y) / itsy.scale
        ));
        down = true;
        break;

      case SDL_MOUSEBUTTONUP:
        printf("SDL_MOUSEBUTTONUP\n");
        if (down) {
          upagain = true;
        } else {
          poke(TOUCH_0_B, false);
          poke(TOUCH_0_X, 0);
          poke(TOUCH_0_Y, 0);
        }
        break;

      //case SDL_FINGERMOTION:
        //printf("SDL_FINGERMOTION\n");
        //break;

      case SDL_MOUSEMOTION:
        if (peek(TOUCH_0_B)) {
          poke(TOUCH_0_X, floor(
            (event.motion.x - itsy.dst.x) / itsy.scale
          ));
          poke(TOUCH_0_Y, floor(
            (event.motion.y - itsy.dst.y) / itsy.scale
          ));
        }
        break;
    }
  }

  lua_getglobal(itsy.lua, "_tick");
  if (lua_isfunction(itsy.lua, -1) && lua_pcall(itsy.lua, 0, 0, 0) != 0) {
    error();
    return;
  }

  lua_getglobal(itsy.lua, "_draw");
  if (lua_isfunction(itsy.lua, -1) && lua_pcall(itsy.lua, 0, 0, 0) != 0) {
    error();
    return;
  }

  draw();
}
