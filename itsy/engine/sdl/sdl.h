#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

typedef struct itsy_sdl_context {
  SDL_Window *window;
  SDL_Renderer *renderer;
  SDL_Texture *canvas;
  SDL_Rect src;
  SDL_Rect dst;
  double scale;
  int x;
  int y;
} itsy_sdl_context;

itsy_sdl_context *sdl;
