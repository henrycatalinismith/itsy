B64=./node_modules/@highvalley.systems/b64
LUA=./node_modules/@highvalley.systems/lua
EMSCRIPTEN=./node_modules/emcc/emsdk/emscripten/1.38.27

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

all: itsy.html

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

itsy.js: $(OBJS)
	$(CC) $(CFLAGS) itsy.c $(OBJS) $(EMCCFLAGS) -o itsy.js

clean:
	rm -f itsy.js
	rm -f itsy.wasm

cleanlua:
	rm -f $(LUA)/src/*.o
	rm -f $(LUA)/src/liblua.a

lua: $(LUA)/src/liblua.a

itsy.html: $(OBJS)
	$(CC) $(CFLAGS) $(EMCCFLAGS) $(OBJS) itsy.c -o itsy.html

.PHONY: all lua sdl clean cleanlua
