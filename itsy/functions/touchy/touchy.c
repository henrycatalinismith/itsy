#include <engine/memory/addresses.h>
#include <functions/peek/peek.h>
#include <functions/touchy/touchy.h>

int itsy_touchy (lua_State *L)
{
  if (peek(TOUCH_0_B)) {
    lua_pushnumber(L, peek(TOUCH_0_Y));
  } else {
    lua_pushnil(L);
  }
  return 1;
}
