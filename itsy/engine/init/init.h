#include <lauxlib.h>

int palette[16][3];

int init_itsy (char *palettePng, char *spritesheetPng);
lua_State* init_lua (lua_State *L);
int init_sdl (int canvasWidth, int canvasHeight);
