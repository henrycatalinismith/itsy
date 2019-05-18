#include <stdbool.h>

#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

#include "itsy.h"
#include "nibble/nibble.h"
#include "peek/peek.h"
#include "poke/poke.h"

int nibble(int addr, bool high)
{
  return high
    ? peek(addr) >> 4
    : peek(addr) & 0x0f;
}
