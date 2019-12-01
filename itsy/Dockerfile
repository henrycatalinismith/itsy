#FROM trzeci/emscripten:1.39.3
FROM apiaryio/emcc:1.38.11

RUN apt-get update \
    && apt-get install -y build-essential libsdl2-dev

RUN mkdir -p /tmp/sdl \
    && cd /tmp/sdl \
    && printf '#include <SDL2/SDL.h>\n' > sdl.c \
    && printf '#include <SDL2/SDL_image.h>\n' > sdl.c \
    && emcc sdl.c -s WASM=1 -s USE_SDL=2 -s USE_SDL_IMAGE=2 -s SDL2_IMAGE_FORMATS='["png"]' -O3 -o sdl.js \
    && cd / \
    && rm -rf /sdl

WORKDIR /itsy
