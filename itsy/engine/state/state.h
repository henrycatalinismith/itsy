#include <stdint.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_render.h>

typedef struct itsy_engine_state {
  uint8_t memory[0x8000];

  SDL_Window *window;
  SDL_Renderer *renderer;
  SDL_Texture *canvas;
  SDL_Rect src;
  SDL_Rect dst;
  double scale;

} itsy_engine_state;

extern itsy_engine_state itsy;
