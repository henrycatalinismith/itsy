#include <SDL2/SDL.h>
#include <itsy.h>
#include <time/time.h>

int itsy_time (lua_State *L)
{
  double diff = (double) SDL_GetTicks() / 1000;
  lua_pushnumber(L, diff);
  return 1;
}
