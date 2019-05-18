#include <itsy.h>
#include <circfill/circfill.h>
#include <line/line.h>
#include <peek/peek.h>
#include <pset/pset.h>

int itsy_circfill (lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);
  int r = luaL_optinteger(L, 3, 4);
  int col = luaL_optinteger(L, 4, peek(DRAW_COLOR));

  circfill(x, y, r, col);

  return 0;
}

void circfill (int x, int y, int r, int col)
{
  int f = 1 - r;
  int ddF_x = 0;
  int ddF_y = -2 * r;
  int cx = 0;
  int cy = r;

  pset(x, y + r, col);
  pset(x, y - r, col);
  line(x + r, y, x - r, y, col);

  while (cx < cy) {
    if (f >= 0) {
      cy--;
      ddF_y += 2;
      f += ddF_y;
    }

    cx++;
    ddF_x += 2;
    f += ddF_x + 1;

    line(x + cx, y + cy, x - cx, y + cy, col);
    line(x + cx, y - cy, x - cx, y - cy, col);
    line(x + cy, y + cx, x - cy, y + cx, col);
    line(x + cy, y - cx, x - cy, y - cx, col);
  }
}
