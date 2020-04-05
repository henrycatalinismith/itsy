---
title: sspr
path: /code/functions/sspr
description: draws a sprite

function:
  category: draw
  input:
    - name: sx
      type: number
      desc: sprite x position
    - name: sy
      type: number
      desc: sprite y position
    - name: sw
      type: number
      desc: sprite width
    - name: sh
      type: number
      desc: sprite height
    - name: dx
      type: number
      desc: screen x position
    - name: dy
      type: number
      desc: screen y position
  output:
    type: nil
  examples:
    🚫: |
      cls(7)
      sspr(0, 0, 8, 8, 56, 56)
      sspr(8, 0, 8, 8, 60, 60)
---
