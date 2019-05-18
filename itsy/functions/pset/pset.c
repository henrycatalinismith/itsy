#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

#include "itsy.h"
#include "nobble/nobble.h"
#include "peek/peek.h"
#include "pset/pset.h"

int itsy_pset (lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);
  int col = luaL_optinteger(L, 3, peek(DRAW_COLOR));

  pset(x, y, col);

  return 0;
}

void pset(int x, int y, int c)
{
  x -= peek(DRAW_CAMERA_X_LO) + peek(DRAW_CAMERA_X_HI) * 256;
  y -= peek(DRAW_CAMERA_Y_LO) + peek(DRAW_CAMERA_Y_HI) * 256;

  if (x < 0 || y < 0 || x > 127 || y > 127) {
    return;
  }

  nobble(pixel[x][y], x % 2 == 1, c);
}