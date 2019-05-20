#include <engine/state/state.h>
#include <functions/poke/poke.h>

int itsy_poke (lua_State *L)
{
  int addr = luaL_checknumber(L, 1);
  int val = luaL_checknumber(L, 2);

  poke(addr, val);

  return 0;
}

void poke(int addr, int val)
{
  itsy.memory[addr] = val;
}