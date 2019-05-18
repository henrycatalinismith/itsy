#include <lua.h>
#include <lauxlib.h>

#include "itsy.h"
#include "peek/peek.h"
#include "touchy/touchy.h"

int itsy_touchy (lua_State *L)
{
  if (peek(TOUCH_0_B)) {
    lua_pushnumber(L, peek(TOUCH_0_Y));
  } else {
    lua_pushnil(L);
  }
  return 1;
}
