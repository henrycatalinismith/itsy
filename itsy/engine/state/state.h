#include <stdint.h>
#include <lua/lua.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

typedef struct itsy_engine_state {
  uint8_t memory[0x8000];
  uint8_t pixels[128 * 128 * 4];
  int palette[16][3];
  lua_State* lua;
  lua_State* debugger;
  SDL_Window *window;
  SDL_Renderer *renderer;
  SDL_Texture *canvas;
  SDL_Rect src;
  SDL_Rect dst;
  double scale;

} itsy_engine_state;

extern itsy_engine_state itsy;
