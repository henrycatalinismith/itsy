#include <lua/lua.h>
#include <lua/lauxlib.h>
#include <lua/lualib.h>

int itsy_poke(lua_State *L);
extern void poke(int addr, int val);