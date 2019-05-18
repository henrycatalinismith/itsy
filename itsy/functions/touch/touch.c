#include <itsy.h>
#include <peek/peek.h>
#include <touch/touch.h>

int itsy_touch (lua_State *L)
{
  lua_pushboolean(L, peek(TOUCH_0_B));
  return 1;
}
