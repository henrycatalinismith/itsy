---
title: touchy
path: /code/functions/touchy
description: gets y position

function:
  category: input
  output:
    type: number
    desc: the y position where the player is touching
  examples:
    interactive demo (touch the square): |
      function _draw()
        if touch() then
          y = touchy()
          cls(1)
          line(0, y, 127, y, 14)
        else
          cls(5)
        end
      end
---
