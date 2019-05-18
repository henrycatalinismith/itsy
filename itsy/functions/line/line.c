#include <stdlib.h>
#include <itsy.h>
#include <line/line.h>
#include <peek/peek.h>
#include <poke/poke.h>
#include <pset/pset.h>

int itsy_line (lua_State *L)
{
  int argc = lua_gettop(L);

  int x0, y0, x1, y1, col;

  switch (argc) {
    case 2:
      x0 = peek(DRAW_LINE_X);
      y0 = peek(DRAW_LINE_Y);
      x1 = luaL_checknumber(L, 1);
      y1 = luaL_checknumber(L, 2);
      col = peek(DRAW_COLOR);
      break;

    case 4:
      x0 = luaL_checknumber(L, 1);
      y0 = luaL_checknumber(L, 2);
      x1 = luaL_checknumber(L, 3);
      y1 = luaL_checknumber(L, 4);
      col = peek(DRAW_COLOR);
      break;

    case 5:
      x0 = luaL_checknumber(L, 1);
      y0 = luaL_checknumber(L, 2);
      x1 = luaL_checknumber(L, 3);
      y1 = luaL_checknumber(L, 4);
      col = luaL_checknumber(L, 5);
      break;
  }

  line(x0, y0, x1, y1, col);

  poke(DRAW_LINE_X, x1);
  poke(DRAW_LINE_Y, y1);

  return 0;
}

// https://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#C
void line(int x0, int y0, int x1, int y1, int col)
{
  int dx = abs(x1 - x0);
  int dy = abs(y1 - y0);
  int sy = y0 < y1 ? 1 : -1;
  int sx = x0 < x1 ? 1 : -1;
  int err = (dx > dy ? dx : -dy) / 2;

  for (;;) {
    pset(x0, y0, col);

    if (x0 == x1 && y0 == y1) {
      break;
    }

    int e2 = err;

    if (e2 >- dx) {
      err -= dy;
      x0 += sx;
    }

    if (e2 < dy) {
      err += dx;
      y0 += sy;
    }
  }
}
