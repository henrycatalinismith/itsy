EMCC = docker run --rm -v $(shell pwd):/src emcc_sdl emcc
EMCCL = docker run --rm -v $(shell pwd)/node_modules/lua-src/src:/src emcc_sdl emcc
FLAGS = node_modules/lua-src/src/liblua.a \
	-s WASM=1 \
	-s MODULARIZE=1 \
	-s USE_SDL=2 \
	-s SDL2_IMAGE_FORMATS='["png"]' \
	-s EXPORTED_FUNCTIONS='["_main","_register_sprite"]' \
	-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
	-O3

clean:
	rm -rf node_modules
	rm -f itsy.js
	rm -f itsy.wasm

emcc_sdl:
	docker build -t emcc_sdl .

base64:
	$(EMCC) node_modules/b64/decode.c -o node_modules/b64/decode.o
	$(EMCC) node_modules/b64/encode.c -o node_modules/b64/encode.o

itsy.js: emcc_sdl lua node_modules
	$(EMCC) -Inode_modules/b64 -Inode_modules/lua-src/src itsy.c $(FLAGS) -o itsy.js node_modules/b64/decode.o

lua: node_modules
	cd node_modules/lua-src/src && make generic CC='$(EMCCL)'

node_modules:
	npm install

.PHONY: base64 clean emcc_sdl lua


