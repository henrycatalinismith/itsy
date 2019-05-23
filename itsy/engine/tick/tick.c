#include <stdbool.h>

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

#include <lua/lua.h>

#include <engine/error/error.h>
#include <engine/memory/addresses.h>
#include <engine/state/state.h>

#include <functions/peek/peek.h>
#include <functions/poke/poke.h>

bool upagain = false;

void tick (void)
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
  if (lua_isfunction(itsy.lua, -1)) {
    if (lua_pcall(itsy.lua, 0, 0, 0) == 0) {
      itsy.did_tick = true;
    } else {
      error();
    }
  } else {
    itsy.did_tick = false;
  }
}
