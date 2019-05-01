---
title: game loop
path: /game-loop
---

The game loop is what makes your game tick, literally!

To use the game loop, you define three specially named functions:

* `_init()`
* `_tick()`
* `_draw()`

If itsy finds functions with these names in your game's code, it'll call them
for you at the right times to make your game loop happen.

`_init()`
---------

If you add an `_init()` function to your game, itsy will call it once:
after loading your code and before starting the main game loop. Your `_init()`
function should contain setup code for initializing your game state.

[more about `_init()` ↠](/game-loop/init)

`_tick()`
---------

If you add a `_tick()` function to your game, itsy will call it 60 times per
second. Your `_tick()` function should contain code for handling input and
advancing the state of the game.

[more about `_tick()` ↠](/game-loop/tick)

`_draw()`
---------

If you add a `_draw()` function to your game, itsy will call it 60 times per
second, after calling `_tick()`. Your `_tick()` function should contain code
for rendering the visual output of your game to the screen.

[more about `_draw()` ↠](/game-loop/draw)