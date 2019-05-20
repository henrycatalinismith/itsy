#include <engine/memory/addresses.h>
#include <functions/peek/peek.h>
#include <functions/touchx/touchx.h>

int itsy_touchx (lua_State *L)
{
  if (peek(TOUCH_0_B)) {
    lua_pushnumber(L, peek(TOUCH_0_X));
  } else {
    lua_pushnil(L);
  }
  return 1;
}
