---
title: _tick()
path: /game-loop/tick
---

If you add a `_tick()` function to your game, itsy will call it 60 times per
second. Your `_tick()` function should contain code for handling input and
advancing the state of the game.

```lua
function _tick()
  score = score + 1
  x = x + speed
  if touch()
    y = 16
  end
end
```

Using `_tick()` isn't required, but itsy will only render one frame of output
if it's not there.
