---
title: touchx
path: /code/functions/touchx
description: gets x position

function:
  category: input
  output:
    type: number
    desc: the x position where the player is touching
  examples:
    interactive demo (touch the square): |
      function _draw()
        if touch() then
          x = touchx()
          cls(1)
          line(x, 0, x, 127, 14)
        else
          cls(5)
        end
      end
---
