---
title: _draw()
path: /game-loop/draw
description: called after every tick
---

If you add a `_draw()` function to your game, itsy will call it 60 times per
second, after calling `_tick()`. Your `_draw()` function should contain code
for rendering the visual output of your game to the screen.

```lua
function _draw()
  cls(12)
  print(score, 8, 8, 7)
  circfill(x, y, 8, 14)
end
```

Using `_draw()` isn't required, but itsy will only render one frame of output
if it's not there.
