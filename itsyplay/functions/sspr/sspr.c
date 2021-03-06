#include <engine/memory/addresses.h>
#include <functions/sget/sget.h>
#include <functions/pset/pset.h>
#include <functions/sspr/sspr.h>

int itsy_sspr (lua_State *L)
{
  int sx = luaL_checknumber(L, 1);
  int sy = luaL_checknumber(L, 2);
  int sw = luaL_checknumber(L, 3);
  int sh = luaL_checknumber(L, 4);
  int dx = luaL_checknumber(L, 5);
  int dy = luaL_checknumber(L, 6);

  sspr(sx, sy, sw, sh, dx, dy);

  return 0;
}

void sspr (int sx, int sy, int sw, int sh, int dx, int dy)
{
  for (int x = 0; x < sw; x++) {
    for (int y = 0; y < sh; y++) {
      int c = sget(sx + x, sy + y);
      if (c != 0) {
        pset(dx + x, dy + y, c);
      }
    }
  }
}
