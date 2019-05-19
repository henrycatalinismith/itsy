#include <itsy.h>
#include <functions/nobble/nobble.h>
#include <functions/sset/sset.h>

int itsy_sset (lua_State *L)
{
  return 0;
}

void sset(int x, int y, int c)
{
  nobble(sprite[x][y], x % 2 == 1, c);
}
