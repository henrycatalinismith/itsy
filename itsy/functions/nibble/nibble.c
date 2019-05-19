#include <itsy.h>
#include <functions/nibble/nibble.h>
#include <functions/peek/peek.h>
#include <functions/poke/poke.h>

int nibble(int addr, bool high)
{
  return high
    ? peek(addr) >> 4
    : peek(addr) & 0x0f;
}
