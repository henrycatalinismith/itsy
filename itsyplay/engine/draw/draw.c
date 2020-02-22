#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

#include <lua/lua.h>

#include <engine/draw/draw.h>
#include <engine/error/error.h>
#include <engine/state/state.h>
#include <functions/pget/pget.h>

void draw (void)
{
  lua_getglobal(itsy.lua, "_draw");
  if (lua_isfunction(itsy.lua, -1)) {
    if (lua_pcall(itsy.lua, 0, 0, 0) == 0) {
      itsy.did_draw = true;
    } else {
      error();
    }
  } else {
    itsy.did_draw = false;
  }
  render();
}

void render (void)
{
  SDL_SetRenderDrawColor(itsy.renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(itsy.renderer);
  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      int c = pget(x, y);
      const unsigned int offset = (128 * 4 * y ) + x * 4;
      itsy.pixels[offset + 0] = itsy.palette[c][2]; // b
      itsy.pixels[offset + 1] = itsy.palette[c][1]; // g
      itsy.pixels[offset + 2] = itsy.palette[c][0]; // r
      itsy.pixels[offset + 3] = SDL_ALPHA_OPAQUE;   // a
    }
  }
  SDL_UpdateTexture(itsy.canvas, NULL, &itsy.pixels[0], 128 * 4);
  SDL_RenderCopy(itsy.renderer, itsy.canvas, &itsy.src, &itsy.dst);
  SDL_RenderPresent(itsy.renderer);
  SDL_UpdateWindowSurface(itsy.window);
}
