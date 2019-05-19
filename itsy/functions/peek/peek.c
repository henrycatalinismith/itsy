#include <itsy.h>
#include <functions/peek/peek.h>

int itsy_peek (lua_State *L)
{
  int addr = luaL_checknumber(L, 1);

  lua_pushnumber(L, peek(addr));

  return 1;
}

int peek(int addr)
{
  return memory[addr];
}
