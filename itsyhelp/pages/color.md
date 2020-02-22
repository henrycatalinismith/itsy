---
title: color
path: /functions/color
description: sets default color

function:
  category: graphics
  input:
    - name: col
      type: number
      desc: default color
  output:
    type: nil
  examples:
    circ(): |
      color(8)
      circ(64, 64)
    circfill(): |
      color(9)
      circfill(64, 64)
    line(): |
      color(10)
      line(64, 64)
    print(): |
      color(11)
      print("ABCDEFG")
    pset(): |
      color(12)
      pset(64, 64)
    rect(): |
      color(13)
      rect(32, 32, 96, 96)
    rectfill(): |
      color(14)
      rectfill(32, 32, 96, 96)
---
