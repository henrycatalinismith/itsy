#include <engine/memory/addresses.h>
#include <functions/peek/peek.h>
#include <functions/touch/touch.h>

int itsy_touch (lua_State *L)
{
  lua_pushboolean(L, peek(TOUCH_0_B));
  return 1;
}
