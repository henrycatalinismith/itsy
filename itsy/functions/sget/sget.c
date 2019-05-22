#include <engine/state/state.h>
#include <functions/nibble/nibble.h>
#include <functions/sget/sget.h>

int itsy_sget (lua_State *L)
{
  return 0;
}

int sget(int x, int y)
{
  if (x < 0 || y < 0 || x > 127 || y > 127) {
    return 0;
  }

  return nibble(itsy.sprite_address[x][y], x % 2 == 1);
}
