#include <itsy.h>
#include <functions/color/color.h>
#include <functions/poke/poke.h>

int itsy_color (lua_State *L)
{
  int col = luaL_checknumber(L, 1);
  poke(DRAW_COLOR, col);
  return 0;
}
