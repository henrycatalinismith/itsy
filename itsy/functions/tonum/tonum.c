#include <itsy.h>
#include <tonum/tonum.h>

int itsy_tonum (lua_State *L)
{
  return luaB_tonumber(L);
}
