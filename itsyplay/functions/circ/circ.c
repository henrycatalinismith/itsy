#include <engine/memory/addresses.h>
#include <functions/circ/circ.h>
#include <functions/peek/peek.h>
#include <functions/pset/pset.h>

int itsy_circ (lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);
  int r = luaL_optinteger(L, 3, 4);
  int col = luaL_optinteger(L, 4, peek(DRAW_COLOR));

  circ(x, y, r, col);

  return 0;
}

// http://rosettacode.org/wiki/Bitmap/Midpoint_circle_algorithm
void circ (int x, int y, int r, int col)
{
  int f = 1 - r;
  int ddF_x = 0;
  int ddF_y = -2 * r;
  int cx = 0;
  int cy = r;

  pset(x, y + r, col);
  pset(x, y - r, col);
  pset(x + r, y, col);
  pset(x - r, y, col);

  while (cx < cy) {
    if (f >= 0) {
      cy--;
      ddF_y += 2;
      f += ddF_y;
    }

    cx++;
    ddF_x += 2;
    f += ddF_x + 1;

    pset(x + cx, y + cy, col);
    pset(x - cx, y + cy, col);
    pset(x + cx, y - cy, col);
    pset(x - cx, y - cy, col);
    pset(x + cy, y + cx, col);
    pset(x - cy, y + cx, col);
    pset(x + cy, y - cx, col);
    pset(x - cy, y - cx, col);
  }
}
