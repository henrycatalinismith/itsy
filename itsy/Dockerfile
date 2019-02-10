FROM apiaryio/emcc

RUN mkdir -p /tmp/sdl \
 && cd /tmp/sdl \
 && printf '#include <SDL2/SDL.h>' > sdl.c \
 && emcc sdl.c -s WASM=1 -s USE_SDL=2 -O3 -o sdl.js \
 && cd / \
 && rm -rf /sdl

RUN apt-get update \
 && apt-get install -y liblua5.3-dev
