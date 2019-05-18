#include <stdbool.h>
#include <itsy.h>
#include <nobble/nobble.h>
#include <peek/peek.h>
#include <poke/poke.h>

void nobble(int addr, bool high, int val)
{
  poke(addr, high
    ? ((val << 4) | (peek(addr) & 0x0f))
    : (((peek(addr) >> 4) << 4) | val)
  );
}
