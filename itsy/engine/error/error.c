#include <emscripten.h>

#include <lua/lua.h>
#include <lua/lauxlib.h>
#include <lua/lualib.h>

#include <engine/draw/draw.h>
#include <engine/state/state.h>

#include <functions/camera/camera.h>
#include <functions/print/print.h>
#include <functions/rectfill/rectfill.h>

void error (void)
{
  const char *msg = lua_tostring(itsy.lua, -1);
  printf("error error lololol\n");
  printf("%s\n", msg);

  camera(0, 0);
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

  luaL_traceback(itsy.lua, itsy.lua, NULL, 1);
  printf("%s\n", lua_tostring(itsy.lua, -1));

  render();
  emscripten_cancel_main_loop();
  exit(-1);
}
