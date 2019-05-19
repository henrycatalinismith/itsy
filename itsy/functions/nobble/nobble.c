#include <stdbool.h>
#include <itsy.h>
#include <functions/nobble/nobble.h>
#include <functions/peek/peek.h>
#include <functions/poke/poke.h>

void nobble(int addr, bool high, int val)
{
  poke(addr, high
    ? ((val << 4) | (peek(addr) & 0x0f))
    : (((peek(addr) >> 4) << 4) | val)
  );
}
