#include <lua.h>
#include <lauxlib.h>

#include "itsy.h"
#include "line/line.h"
#include "peek/peek.h"
#include "rect/rect.h"

int itsy_rect (lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_optinteger(L, 5, peek(DRAW_COLOR));

  rect(x0, y0, x1, y1, col);

  return 0;
}

void rect (int x0, int y0, int x1, int y1, int col)
{
  line(x0, y0, x1, y0, col);
  line(x1, y0, x1, y1, col);
  line(x1, y1, x0, y1, col);
  line(x0, y1, x0, y0, col);
}
