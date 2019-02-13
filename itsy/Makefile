CC=./node_modules/emcc/emsdk/emscripten/1.38.27/emcc
AR=./node_modules/emcc/emsdk/emscripten/1.38.27/emar
RANLIB=./node_modules/emcc/emsdk/emscripten/1.38.27/emranlib

EMCONFIGURE=./node_modules/emcc/emsdk/emscripten/1.38.27/emconfigure
EMMAKE=./node_modules/emcc/emsdk/emscripten/1.38.27/emmake

CFLAGS=-O2 \
		-Inode_modules/b64 \
		-Inode_modules/lua-src/src

OBJS=node_modules/lua-src/src/liblua.a \
		 b64_decode.o \
		 b64_encode.o

EMCCFLAGS=-s WASM=1 \
					-s MODULARIZE=1 \
					-s USE_SDL=2 \
					-s USE_SDL_IMAGE=2 \
					-s SDL2_IMAGE_FORMATS='["png"]' \
					-s EXPORTED_FUNCTIONS='["_main","_register_sprite"]' \
					-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
					-s ERROR_ON_UNDEFINED_SYMBOLS=0

all: itsy.html

itsy.html: lua
	$(CC) node_modules/b64/decode.c -o b64_decode.o
	$(CC) node_modules/b64/encode.c -o b64_encode.o
	$(CC) $(CFLAGS) $(EMCCFLAGS) $(OBJS) itsy.c -o itsy.html

lua:
	$(EMMAKE) make -C node_modules/lua-src/src generic

hello.html:
	$(CC) $(CFLAGS) $(EMCCFLAGS) hello.c -o hello.html

clean:
	rm -f itsy.js
	rm -f itsy.wasm

.PHONY: all lua sdl clean
