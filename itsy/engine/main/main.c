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
#include <engine/state/state.h>
#include <engine/tick/tick.h>

itsy_engine_state itsy;

void loop (void);

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

void loop (void)
{
  tick();
  draw();
}
