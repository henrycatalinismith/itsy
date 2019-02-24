B64=./node_modules/@highvalley.systems/b64
LUA=./node_modules/@highvalley.systems/lua
EMSCRIPTEN=./node_modules/emcc/emsdk/emscripten/1.38.27

VERSION := $(shell grep "version" package.json | awk '{ print substr($$2, 2, length($$2) - 3); }')

LUA_SRC := $(wildcard $(LUA)/src/*.c)
LUA_OBJ := $(patsubst $(LUA)/src/%.c, $(LUA)/src/%.o, $(LUA_SRC))

CC=$(EMSCRIPTEN)/emcc
AR=$(EMSCRIPTEN)/emar
RANLIB=$(EMSCRIPTEN)/emranlib

EMCONFIGURE=$(EMSCRIPTEN)/emconfigure
EMMAKE=$(EMSCRIPTEN)/emmake

CFLAGS=\
	-O2 \
	-I$(B64) \
	-I$(LUA)/src

OBJS=\
	$(B64)/decode.o \
	$(B64)/encode.o \
	$(LUA)/src/liblua.a

EMCCFLAGS=\
	-s WASM=1 \
	-s MODULARIZE=1 \
	-s USE_SDL=2 \
	-s USE_SDL_IMAGE=2 \
	-s SDL2_IMAGE_FORMATS='["png"]' \
	-s EXPORTED_FUNCTIONS='["_main"]' \
	-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
	-s ERROR_ON_UNDEFINED_SYMBOLS=0

$(B64)/%.o:
	$(CC) $(B64)/$*.c -o $(B64)/$*.o

$(LUA)/src/%.o:
	perl -p -i -e "s/^static int luaB_/int luaB_/g" $(LUA)/src/$*.c # yoink
	perl -p -i -e "s/^static int math_/int math_/g" $(LUA)/src/$*.c # lololol
	perl -p -i -e "s/^static int tinsert/int tinsert/g" $(LUA)/src/$*.c
	perl -p -i -e "s/^static int tremove/int tremove/g" $(LUA)/src/$*.c
	cd $(LUA)/src && make $*.o CC='../../../../$(CC)'

$(LUA)/src/liblua.a: $(LUA_OBJ)
	cd $(LUA)/src && make generic CC='../../../../$(CC)'

engine/itsy.js: $(OBJS)
	$(CC) $(CFLAGS) engine/itsy.c $(OBJS) $(EMCCFLAGS) -o engine/itsy-$(VERSION).js
	mv engine/itsy-$(VERSION).js engine/itsy.js
	mv engine/itsy-$(VERSION).wasm engine/itsy.wasm

clean:
	rm -f itsy.js
	rm -f itsy.wasm

cleanlua:
	rm -f $(LUA)/src/*.o
	rm -f $(LUA)/src/liblua.a

itsy: engine/itsy.js

lua: $(LUA)/src/liblua.a

.PHONY: all itsy lua sdl clean cleanlua
