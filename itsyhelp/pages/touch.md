---
title: touch
path: /functions/touch
description: detects touches

function:
  category: input
  output:
    type: boolean
    desc: true when the player touches the screen
  examples:
    interactive demo (touch the square): |
      function _draw()
        if touch() then
          cls(12)
        else
          cls(1)
        end
      end
---
