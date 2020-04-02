B64=./node_modules/@highvalley.systems/b64
ENGINE=./engine
FUNCTIONS=./functions
LUA=./lua

VERSION := $(shell grep "version" package.json | awk '{ print substr($$2, 2, length($$2) - 3); }')

ENGINE_SRC := $(filter-out ./engine/main/main.c, $(wildcard $(ENGINE)/*/*.c))
ENGINE_OBJ := $(patsubst %.c, %.o, $(ENGINE_SRC))

FUNCTIONS_SRC := $(wildcard $(FUNCTIONS)/*/*.c)
FUNCTIONS_OBJ := $(patsubst %.c, %.o, $(FUNCTIONS_SRC))

LUA_SRC := $(wildcard $(LUA)/*.c)
LUA_OBJ := $(patsubst $(LUA)/%.c, $(LUA)/%.o, $(LUA_SRC))

CC=emcc
AR=emar
RANLIB=emranlib
EMCONFIGURE=emconfigure
EMMAKE=emmake

CFLAGS=\
	-O2 \
	-I. \
	-s USE_SDL=2 \
	-s USE_SDL_IMAGE=2 \
	-s SDL2_IMAGE_FORMATS='["png"]' \
	-I/emsdk_portable/emscripten/tag-1.39.3/system/include/ \
	-I./engine \
	-I$(B64)

OBJS=\
	$(B64)/decode.o \
	$(B64)/encode.o \
	$(LUA)/lbaselib.o \
	$(LUA)/lcorolib.o \
	$(LUA)/lmathlib.o \
	$(LUA)/lstrlib.o \
	$(LUA)/ltablib.o \
	$(LUA)/liblua.a

EMCCFLAGS=\
	-s ALLOW_MEMORY_GROWTH=1 \
	-s ENVIRONMENT="web" \
	-s ERROR_ON_UNDEFINED_SYMBOLS=0 \
	-s EXPORT_NAME="itsy" \
	-s EXPORTED_FUNCTIONS='["_main", "_pget"]' \
	-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
	-s SDL2_IMAGE_FORMATS='["png"]' \
	-s SINGLE_FILE=1 \
	-s USE_SDL=2 \
	-s USE_SDL_IMAGE=2 \
	-s WASM=1 \

$(B64)/%.o:
	$(CC) $(B64)/$*.c -o $(B64)/$*.o

$(ENGINE)/*/%.o:
	$(CC) $(CFLAGS) $(ENGINE)/$*/$*.c $(EMCCFLAGS) -o $@

$(FUNCTIONS)/*/%.o:
	$(CC) $(CFLAGS) $(EMCCFLAGS) $(FUNCTIONS)/$*/$*.c -o $@

$(LUA)/%.o:
	perl -p -i -e "s/^static int luaB_/int luaB_/g" $(LUA)/$*.c # yoink
	perl -p -i -e "s/^static int math_/int math_/g" $(LUA)/$*.c # lololol
	perl -p -i -e "s/^static int str_/int str_/g" $(LUA)/$*.c # lololol
	perl -p -i -e "s/^static int gmatch/int gmatch/g" $(LUA)/$*.c # lololol
	perl -p -i -e "s/^static int tinsert/int tinsert/g" $(LUA)/$*.c
	perl -p -i -e "s/^static int tremove/int tremove/g" $(LUA)/$*.c
	cd $(LUA) && make $*.o CC='$(CC)'

$(LUA)/liblua.a: $(LUA_OBJ)
	cd $(LUA) && make generic CC='$(CC)'

base64/engine.js: engine/itsy.js
	echo "module.exports = \"" | perl -pe "chomp" > base64/engine.js
	base64 engine/itsy.js | perl -pe "chomp" >> base64/engine.js
	echo "\"" >> base64/engine.js

base64/favicon.js:
	echo "module.exports = '`base64 defaults/favicon.ico`'" > base64/favicon.js

base64/palette.js:
	echo "module.exports = '`base64 defaults/palette.png`'" > base64/palette.js

base64/snapshot.js:
	echo "module.exports = '`base64 defaults/snapshot.png`'" > base64/snapshot.js

base64/spritesheet.js:
	echo "module.exports = '`base64 defaults/spritesheet.png`'" > base64/spritesheet.js

base64/stylesheet.js:
	echo "module.exports = '`base64 --wrap=0 style.css`'" > base64/stylesheet.js

engine/itsy.js: $(OBJS) $(FUNCTIONS_OBJ) $(ENGINE_OBJ)
	$(CC) $(CFLAGS) engine/main/main.c $(OBJS) $(FUNCTIONS_OBJ) $(ENGINE_OBJ) $(EMCCFLAGS) -o engine/itsy.js

clean:
	rm -f base64/engine.js
	rm -f base64/stylesheet.js
	rm -f engine/itsy.js
	rm -f engine/*/*.o
	rm -f functions/*/*.o

cleanlua:
	rm -f $(LUA)/*.o
	rm -f $(LUA)/liblua.a

engine: engine/itsy.js base64/engine.js base64/stylesheet.js 

itsy: engine/itsy.js base64/engine.js base64/stylesheet.js

lua: $(LUA)/liblua.a

Dockerfile:
	docker build -t highvalleysystems/itsy .

.PHONY: all itsy lua sdl clean cleanlua engine Dockerfile
