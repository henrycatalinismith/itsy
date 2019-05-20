#include <engine/memory/addresses.h>
#include <functions/line/line.h>
#include <functions/peek/peek.h>
#include <functions/rectfill/rectfill.h>

int itsy_rectfill (lua_State *L)
{
  int x0 = luaL_checknumber(L, 1);
  int y0 = luaL_checknumber(L, 2);
  int x1 = luaL_checknumber(L, 3);
  int y1 = luaL_checknumber(L, 4);
  int col = luaL_optinteger(L, 5, peek(DRAW_COLOR));

  rectfill(x0, y0, x1, y1, col);

  return 0;
}

void rectfill(int x0, int y0, int x1, int y1, int col)
{
  for (int y = y0; y < y1; y++) {
    line(x0, y, x1, y, col);
  }
}
