#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

#include "itsy.h"
#include "nibble/nibble.h"
#include "pget/pget.h"

int itsy_pget (lua_State *L)
{
  // not ready lol
  return 0;
}

int pget(int x, int y)
{
  if (x < 0 || y < 0 || x > 127 || y > 127) {
    return 0;
  }

  return nibble(pixel[x][y], x % 2 == 1);
}
