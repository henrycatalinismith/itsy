#include <stdint.h>
#include <engine/memory/addresses.h>
#include <engine/state/state.h>
#include <functions/nobble/nobble.h>
#include <functions/peek/peek.h>
#include <functions/pset/pset.h>

int itsy_pset (lua_State *L)
{
  int x = luaL_checknumber(L, 1);
  int y = luaL_checknumber(L, 2);
  int col = luaL_optinteger(L, 3, peek(DRAW_COLOR));

  pset(x, y, col);

  return 0;
}

void pset (int x, int y, int c)
{
  int16_t xoffset = peek(DRAW_CAMERA_X_LO) + peek(DRAW_CAMERA_X_HI) * 256;
  int16_t yoffset = peek(DRAW_CAMERA_Y_LO) + peek(DRAW_CAMERA_Y_HI) * 256;
  int16_t px = x - xoffset;
  int16_t py = y - yoffset;

  if (px < 0 || py < 0 || px > 127 || py > 127) {
    return;
  }

  nobble(itsy.screen_address[px][py], px % 2 == 1, c);
}
