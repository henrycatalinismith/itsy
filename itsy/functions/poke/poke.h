#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

int itsy_poke(lua_State *L);
extern void poke(int addr, int val);