#include <itsy.h>
#include <functions/camera/camera.h>
#include <functions/poke/poke.h>

int itsy_camera (lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);

  poke(DRAW_CAMERA_X_LO, x % 256);
  poke(DRAW_CAMERA_X_HI, (x >> 8) & 0xff);
  poke(DRAW_CAMERA_Y_LO, y % 256);
  poke(DRAW_CAMERA_Y_HI, (y >> 8) & 0xff);

  return 0;
}
