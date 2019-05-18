#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

#include "itsy.h"
#include "cls/cls.h"
#include "rectfill/rectfill.h"

int itsy_cls (lua_State *L)
{
  int argc = lua_gettop(L);
  int color = 0;
  if (argc > 0) {
    color = luaL_checknumber(L, 1);
  }

  rectfill(0, 0, 128, 128, color);

  return 0;
}
