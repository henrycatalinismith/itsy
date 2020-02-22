#include <lua/lua.h>
#include <lua/lauxlib.h>
#include <lua/lualib.h>

int itsy_line (lua_State *L);
void line (int x0, int y0, int x1, int y1, int col);