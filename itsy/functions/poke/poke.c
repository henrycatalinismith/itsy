#include <itsy.h>
#include <poke/poke.h>

int itsy_poke (lua_State *L)
{
  int addr = luaL_checknumber(L, 1);
  int val = luaL_checknumber(L, 2);

  poke(addr, val);

  return 0;
}

void poke(int addr, int val)
{
  memory[addr] = val;
}