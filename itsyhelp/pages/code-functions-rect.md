---
title: rect
path: /code/functions/rect
description: draws a rectangle

function:
  category: draw
  input:
    - name: x0
      type: number
      desc: top left x
    - name: y0
      type: number
      desc: top left y
    - name: x1
      type: number
      desc: bottom right x
    - name: y1
      type: number
      desc: bottom right y
    - name: col
      type: number
      desc: border color
      default: draw state color
  output:
    type: nil
  examples:
    7 concentric rectangles: |
      rect(0, 0, 127, 127, 7)
      rect(1, 1, 126, 126, 8)
      rect(2, 2, 125, 125, 9)
      rect(4, 4, 123, 123, 10)
      rect(8, 8, 119, 119, 11)
      rect(16, 16, 111, 111, 12)
      rect(32, 32, 95, 95, 13)
      rect(64, 64, 63, 63, 14)
---
