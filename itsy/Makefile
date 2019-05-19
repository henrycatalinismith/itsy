B64=./node_modules/@highvalley.systems/b64
ENGINE=./engine
FUNCTIONS=./functions
LUA=./lua
EMSCRIPTEN=./node_modules/emcc/emsdk/emscripten/1.38.31

VERSION := $(shell grep "version" package.json | awk '{ print substr($$2, 2, length($$2) - 3); }')

ENGINE_SRC := $(wildcard $(ENGINE)/*/*.c)
ENGINE_OBJ := $(patsubst %.c, %.o, $(ENGINE_SRC))

FUNCTIONS_SRC := $(wildcard $(FUNCTIONS)/*/*.c)
FUNCTIONS_OBJ := $(patsubst %.c, %.o, $(FUNCTIONS_SRC))

LUA_SRC := $(wildcard $(LUA)/*.c)
LUA_OBJ := $(patsubst $(LUA)/%.c, $(LUA)/%.o, $(LUA_SRC))

CC=$(EMSCRIPTEN)/emcc
AR=$(EMSCRIPTEN)/emar
RANLIB=$(EMSCRIPTEN)/emranlib

EMCONFIGURE=$(EMSCRIPTEN)/emconfigure
EMMAKE=$(EMSCRIPTEN)/emmake

CFLAGS=\
	-O2 \
	-I. \
	-I./engine \
	-I$(B64) \
	-I$(LUA)

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
	$(CC) $(CFLAGS) $(FUNCTIONS)/$*/$*.c $(EMCCFLAGS) -o $@

$(LUA)/%.o:
	perl -p -i -e "s/^static int luaB_/int luaB_/g" $(LUA)/$*.c # yoink
	perl -p -i -e "s/^static int math_/int math_/g" $(LUA)/$*.c # lololol
	perl -p -i -e "s/^static int str_/int str_/g" $(LUA)/$*.c # lololol
	perl -p -i -e "s/^static int gmatch/int gmatch/g" $(LUA)/$*.c # lololol
	perl -p -i -e "s/^static int tinsert/int tinsert/g" $(LUA)/$*.c
	perl -p -i -e "s/^static int tremove/int tremove/g" $(LUA)/$*.c
	cd $(LUA) && make $*.o CC='../$(CC)'

$(LUA)/liblua.a: $(LUA_OBJ)
	cd $(LUA) && make generic CC='../$(CC)'

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
	echo "module.exports = '`base64 style.css`'" > base64/stylesheet.js

editor/index.html:
	npm run build-editor

engine/core.js: $(OBJS) $(FUNCTIONS_OBJ) $(ENGINE_OBJ)
	$(CC) $(CFLAGS) engine/itsy.c $(OBJS) $(FUNCTIONS_OBJ) $(ENGINE_OBJ) $(EMCCFLAGS) -o engine/core.js

engine/itsy.js: engine/core.js
	sed -e "/\/\/--:Module:--\/\//{r engine/core.js" -e "d" -e "}" engine/template.js > engine/itsy.js
	./node_modules/.bin/prettier --write engine/itsy.js

manual/index.html: base64/engine.js base64/stylesheet.js
	npm run build-manual

clean:
	rm -f base64/engine.js
	rm -f base64/stylesheet.js
	rm -f engine/core.js
	rm -f engine/itsy.js
	rm -f engine/*/*.o
	rm -f functions/*/*.o
	rm -f manual/index.html

cleanlua:
	rm -f $(LUA)/*.o
	rm -f $(LUA)/liblua.a

itsy: engine/itsy.js base64/engine.js base64/stylesheet.js editor/index.html manual/index.html

lua: $(LUA)/liblua.a

.PHONY: all itsy lua sdl clean cleanlua
