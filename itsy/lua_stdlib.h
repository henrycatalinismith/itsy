// we want to load lua's standard library in a more cosy pico8 kind of way:
//
//  1. only a few functions rather than the whole library
//  2. everything in the global namespace rather than nested in tables
//
// lua tries to prevent this kind of customization by declaring all its
// standard library functions as static and not declaring them in .h files
//
// this gets in the way of our goals so we use a bit of perl magic in the
// makefile to remove the unwanted static keywords and these declarations to
// enable us to access those internal functions anyway! 🖕😎

// lbaselib.c
int luaB_pairs(lua_State *L);
int luaB_print(lua_State *L);
int luaB_tonumber(lua_State *L);
int luaB_tostring(lua_State *L);
int luaB_type(lua_State *L);

// lmathlib.c
int math_abs(lua_State *L);
int math_ceil(lua_State *L);
int math_floor(lua_State *L);
int math_max(lua_State *L);
int math_min(lua_State *L);
int math_pow(lua_State *L);
int math_random(lua_State *L);

// ltablib.c
int tinsert(lua_State *L);
int tremove(lua_State *L);

