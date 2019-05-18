#include <stdbool.h>
#include <lua.h>
#include <lauxlib.h>

int itsy_print(lua_State *L);
void print(const char *str, int x, int y, int col);

typedef struct glyph {
  char *c;
  bool px[5][3];
} glyph;
