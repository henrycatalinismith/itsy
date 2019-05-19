#include <itsy.h>
#include <functions/nibble/nibble.h>
#include <functions/pget/pget.h>

int itsy_pget (lua_State *L)
{
  return 0;
}

int pget (int x, int y)
{
  if (x < 0 || y < 0 || x > 127 || y > 127) {
    return 0;
  }

  return nibble(pixel[x][y], x % 2 == 1);
}
