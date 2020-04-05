---
title: pset
path: /code/functions/pset
description: sets one pixel

function:
  category: draw
  input:
    - name: x
      type: number
      desc: x position
    - name: y
      type: number
      desc: y position
    - name: col
      type: number
      desc: new color
      default: draw state color
  output:
    type: nil
  examples:
    setting some pixels: |
      pset(0, 0, 7)
      pset(1, 1, 8)
      pset(2, 2, 9)
      pset(4, 4, 10)
      pset(8, 8, 11)
      pset(16, 16, 12)
      pset(32, 32, 13)
      pset(64, 64, 14)
---
