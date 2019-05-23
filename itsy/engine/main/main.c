#include <stdbool.h>

#include <emscripten.h>

#include <engine/init/init.h>
#include <engine/draw/draw.h>
#include <engine/state/state.h>
#include <engine/tick/tick.h>

itsy_engine_state itsy;

void loop (void);

int main (int argc, char **argv)
{
  init(argc, argv);
  emscripten_set_main_loop(loop, -1, 1);
  return 0;
}

void loop (void)
{
  tick();
  draw();

  if (!itsy.did_tick && !itsy.did_draw) {
    emscripten_cancel_main_loop();
  }
}
