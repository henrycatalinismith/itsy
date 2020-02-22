---
title: _init()
path: /game-loop/init
description: called once during startup
---

If you add an `_init()` function to your game, itsy will call it once:
after loading your code and before starting the main game loop. Your `_init()`
function should contain setup code for initializing your game state.

```lua
function _init()
  level = 1
  health = 100
  score = 0
  x = 0
  y = 0
end
```

Using `_init()` isn't required, and itsy will run just fine if you leave out
this function. If you find you prefer not to write an `_init()` function,
then don't! You can write your setup code "loose" in the global scope instead
if you prefer.

```lua
level = 1
health = 100
score = 0
speed = 1
x = 0
y = 0
```

The main reason `_init()` is sometimes useful is that it lets you define your
initialization code anywhere, without worrying about load order. Without it, you
will occasionally find you have to put your initialization code at the _end_ of
your code.

In the following example, the initial call to `generate_random_level()` will
produce a runtime error.

```lua
-- setup without _init()
generate_random_level() -- error!

function generate_random_level()
  -- level generation code
end
```

This is because it's being called before lua has processed its definition.
This could be fixed by either wrapping it in an `_init()` function, or by
moving it to the bottom!
