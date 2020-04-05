---
title: line
path: /code/functions/line
description: draws a line

function:
  category: draw
  input:
    - name: x0
      type: number
      desc: start x
      default: x1 from previous call
    - name: y0
      type: number
      desc: start y
      default: y1 from previous call
    - name: x1
      type: number
      desc: finish x
    - name: y1
      type: number
      desc: finish y
    - name: col
      type: number
      desc: line color
      default: draw state color
  output:
    type: nil
  examples:
    red diamond: |
      line(63, 0, 126, 63, 8)
      line(126, 63, 63, 126, 8)
      line(63, 126, 0, 63, 8)
      line(0, 63, 63, 0, 8)
    default input: |
      color(8)
      line(63, 0, 126, 63)
      line(63, 126)
      line(0, 63)
      line(63, 0)
---
