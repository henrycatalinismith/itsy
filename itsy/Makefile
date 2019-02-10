EMCC = docker run --rm -v $(shell pwd):/src emcc_sdl emcc
EMCCL = docker run --rm -v $(shell pwd)/node_modules/lua-src/src:/src emcc_sdl emcc
FLAGS = node_modules/lua-src/src/liblua.a -s WASM=1 -s USE_SDL=2 -O3

clean:
	rm -rf node_modules
	rm -f itsy8.js
	rm -f itsy8.wasm

emcc_sdl:
	docker build -t emcc_sdl .

itsy8.js: emcc_sdl lua node_modules
	$(EMCC) -Inode_modules/lua-src/src itsy8.c $(FLAGS) -o itsy8.js

lua: node_modules
	cd node_modules/lua-src/src && make generic CC='$(EMCCL)'

node_modules:
	npm install

.PHONY: clean emcc_sdl lua


