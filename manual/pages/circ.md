---
title: circ
path: /functions/circ
description: draws a circle

function:
  category: draw
  input:
    - name: x
      type: number
      desc: center x
    - name: y
      type: number
      desc: center y
    - name: r
      type: number
      desc: radius
      default: 4
    - name: col
      type: number
      desc: border color
      default: draw state color
  output:
    type: nil
  examples:
    7 concentric circles: |
      circ(64, 64, 1, 14)
      circ(64, 64, 2, 12)
      circ(64, 64, 4, 11)
      circ(64, 64, 8, 10)
      circ(64, 64, 16, 9)
      circ(64, 64, 32, 8)
      circ(64, 64, 64, 7)
---
