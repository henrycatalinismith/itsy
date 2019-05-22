#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>

#include <emscripten.h>

#include <b64.h>

#include <lua/lua.h>
#include <lua/lauxlib.h>
#include <lua/lualib.h>

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

#include <engine/init/init.h>
#include <engine/memory/addresses.h>
#include <engine/memory/optimizations.h>
#include <engine/state/state.h>

#include <functions/abs/abs.h>
#include <functions/add/add.h>
#include <functions/camera/camera.h>
#include <functions/ceil/ceil.h>
#include <functions/circ/circ.h>
#include <functions/circfill/circfill.h>
#include <functions/cls/cls.h>
#include <functions/cocreate/cocreate.h>
#include <functions/color/color.h>
#include <functions/coresume/coresume.h>
#include <functions/cos/cos.h>
#include <functions/costatus/costatus.h>
#include <functions/del/del.h>
#include <functions/flr/flr.h>
#include <functions/line/line.h>
#include <functions/lower/lower.h>
#include <functions/max/max.h>
#include <functions/min/min.h>
#include <functions/nibble/nibble.h>
#include <functions/nobble/nobble.h>
#include <functions/pairs/pairs.h>
#include <functions/poke/poke.h>
#include <functions/peek/peek.h>
#include <functions/print/print.h>
#include <functions/pget/pget.h>
#include <functions/pset/pset.h>
#include <functions/rect/rect.h>
#include <functions/rectfill/rectfill.h>
#include <functions/rnd/rnd.h>
#include <functions/sget/sget.h>
#include <functions/sin/sin.h>
#include <functions/sset/sset.h>
#include <functions/sspr/sspr.h>
#include <functions/sub/sub.h>
#include <functions/tan/tan.h>
#include <functions/time/time.h>
#include <functions/tonum/tonum.h>
#include <functions/tostr/tostr.h>
#include <functions/touch/touch.h>
#include <functions/touchx/touchx.h>
#include <functions/touchy/touchy.h>
#include <functions/type/type.h>
#include <functions/upper/upper.h>
#include <functions/yield/yield.h>

itsy_engine_state itsy;

uint16_t sprite[128][128];
uint16_t pixel[128][128];

bool error = false;

void loop(void);
void render(void);

void runtime_error(lua_State *L);

int main (int argc, char **argv)
{
  if (!init(argc, argv)) {
    printf("init failed\n");
    return -1;
  }

  lua_getglobal(itsy.lua, "_tick");
  int has_tick = lua_isfunction(itsy.lua, -1);
  lua_getglobal(itsy.lua, "_draw");
  int has_draw = lua_isfunction(itsy.lua, -1);

  if (has_tick || has_draw) {
    emscripten_set_main_loop(loop, -1, 1);
  } else {
    render();
  }

  return 0;
}

bool upagain = false;

void loop(void)
{
  SDL_Event event;
  bool down = false;

  if (upagain) {
    poke(TOUCH_0_B, false);
    poke(TOUCH_0_X, 0);
    poke(TOUCH_0_Y, 0);
    upagain = false;
  }

  while (SDL_PollEvent(&event)) {
    switch (event.type) {
      //case SDL_FINGERDOWN:
        //printf("finger %d, %d\n", (int)event.tfinger.x, (int)event.tfinger.y);
        //break;

      //case SDL_FINGERUP:
        //printf("SDL_FINGERUP\n");
        //break;

      case SDL_MOUSEBUTTONDOWN:
        printf("mouse %d, %d\n", event.button.x, event.button.y);
        poke(TOUCH_0_B, true);
        poke(TOUCH_0_X, floor(
          (event.motion.x - itsy.dst.x) / itsy.scale
        ));
        poke(TOUCH_0_Y, floor(
          (event.motion.y - itsy.dst.y) / itsy.scale
        ));
        down = true;
        break;

      case SDL_MOUSEBUTTONUP:
        printf("SDL_MOUSEBUTTONUP\n");
        if (down) {
          upagain = true;
        } else {
          poke(TOUCH_0_B, false);
          poke(TOUCH_0_X, 0);
          poke(TOUCH_0_Y, 0);
        }
        break;

      //case SDL_FINGERMOTION:
        //printf("SDL_FINGERMOTION\n");
        //break;

      case SDL_MOUSEMOTION:
        if (peek(TOUCH_0_B)) {
          poke(TOUCH_0_X, floor(
            (event.motion.x - itsy.dst.x) / itsy.scale
          ));
          poke(TOUCH_0_Y, floor(
            (event.motion.y - itsy.dst.y) / itsy.scale
          ));
        }
        break;
    }
  }

  lua_getglobal(itsy.lua, "_tick");
  if (lua_isfunction(itsy.lua, -1) && lua_pcall(itsy.lua, 0, 0, 0) != 0) {
    runtime_error(itsy.lua);
    return;
  }

  lua_getglobal(itsy.lua, "_draw");
  if (lua_isfunction(itsy.lua, -1) && lua_pcall(itsy.lua, 0, 0, 0) != 0) {
    runtime_error(itsy.lua);
    return;
  }

  if (error == true) {
    emscripten_cancel_main_loop();
  }

  render();
}

void render (void)
{
  SDL_SetRenderDrawColor(itsy.renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(itsy.renderer);

  for (int x = 0; x < 128; x++) {
    for (int y = 0; y < 128; y++) {
      int c = pget(x, y);
      const unsigned int offset = (128 * 4 * y ) + x * 4;
      itsy.pixels[offset + 0] = palette[c][2];    // b
      itsy.pixels[offset + 1] = palette[c][1];    // g
      itsy.pixels[offset + 2] = palette[c][0];    // r
      itsy.pixels[offset + 3] = SDL_ALPHA_OPAQUE; // a
    }
  }

  SDL_UpdateTexture(
    itsy.canvas,
    NULL,
    &itsy.pixels[0],
    128 * 4
  );

  SDL_RenderCopy(itsy.renderer, itsy.canvas, &itsy.src, &itsy.dst);
  SDL_RenderPresent(itsy.renderer);
  SDL_UpdateWindowSurface(itsy.window);
}

void runtime_error (lua_State *L)
{
  const char *msg = lua_tostring(L, -1);
  printf("error error lololol\n");
  printf("%s\n", msg);

  rectfill(0, 0, 128, 128, 0);
  print(msg, 0, 0, 7);

  char *debug =
    "last = nil\n"
    "j = 0\n"
    "linenr = nil\n"
    "msg = ''\n"
    "msglines = {}\n"
    "for i = 1, #error do\n"
    "  char = sub(error, i, i)\n"
    "  if char == ' ' and last == ':' then\n"
    "    j = 1\n"
    "    lchars = ''\n"
    "    for k = i-2,1,-1 do\n"
    "      lchr = sub(error, k, k)\n"
    "      --print(lchr, 6*(k+1), 1, 7)\n"
    "      if lchr == ':' then\n"
    "        break\n"
    "      else\n"
    "        lchars = lchr .. lchars\n"
    "      end\n"
    "    end\n"
    "    linenr = tonum(lchars) - 1\n"
    "    --print('(' .. linenr .. ')', 1, 120, 5)\n"
    "  end\n"
    "  if j > 0 then\n"
    "    if j > 1 then\n"
    "      msg = msg .. char\n"
    "    end\n"
    "    j = j + 1\n"
    "    if #msg == 28 then\n"
    "      add(msglines, msg)\n"
    "      msg = ''\n"
    "    end\n"
    "  end\n"
    "  last = char\n"
    "end\n"
    "if #msg > 0 then\n"
    "  add(msglines, msg)\n"
    "end\n"
    "\n"
    "--print(#msglines, 120, 120, 11)\n"
    "for i,line in pairs(msglines) do\n"
    "  --print(line, 4, 4 + (i * 6), 12)\n"
    "end\n"
    "--print(lua, 4, 32, 11)\n"
    "i = 0\n"
    "lines = {}\n"
    "curr = 1\n"
    "lstr = ''\n"
    "for i = 1, #lua do\n"
    "  char = sub(lua, i, i)\n"
    "  --print(char, i * 6, 48, 12)\n"
    "  if char == \"\\n\" then\n"
    "    --print(lstr, 4, 48 + (curr * 6), 13)\n"
    "    curr = curr + 1\n"
    "    add(lines, lstr)\n"
    "    lstr = ''\n"
    "  else\n"
    "    lstr = lstr .. char\n"
    "  end\n"
    "end\n"
    "add(lines, lstr)\n"
    "del(lines, 1)\n"
    "rectfill(0, 0, 127, 16, 14)\n"
    "print('ERROR ON LINE ' .. linenr, 4, 8, 2)\n"
    "startline = max(linenr - 3, 1)\n"
    "endline = min(startline + 8, #lines)\n"
    "l = 0\n"
    "line(0, 16, 127, 16, 2)\n"
    "rectfill(0, 17, 127, 81, 7)\n"
    "line(0, 81, 127, 81, 2)\n"
    "rectfill(0, 82, 127, 127, 14)\n"
    "for i = startline,endline do\n"
    "  y = 17 + (l * 7)\n"
    "  if i == linenr then\n"
    "    rectfill(0, y, 127, y + 7, 8)\n"
    "    fg = 7\n"
    "  else\n"
    "    fg = 14\n"
    "  end\n"
    "  print(lines[i], 4, y + 1, fg)\n"
    "  l = l + 1\n"
    "end\n"
    "for i,line in pairs(msglines) do\n"
    "  print(upper(line), 4, 84 + ((i-1) * 8), 2)\n"
    "end\n"

  ;

  lua_pushstring(itsy.debugger, msg);
  lua_setfield(itsy.debugger, -2, "error");

  luaL_dostring(itsy.debugger, debug);

  luaL_traceback(L, L, NULL, 1);
  printf("%s\n", lua_tostring(L, -1));

  render();
  error = true;
}
