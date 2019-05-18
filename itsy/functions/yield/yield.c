#include <yield/yield.h>

int itsy_yield (lua_State *L)
{
  return luaB_yield(L);
}
