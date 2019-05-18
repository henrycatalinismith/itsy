#include <itsy.h>
#include <tostr/tostr.h>

int itsy_tostr (lua_State *L)
{
  return luaB_tostring(L);
}
