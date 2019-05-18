#include "lua.h"
#include "ceil.h"

int itsy_ceil (lua_State *L)
{
  return math_ceil(L);
}
