---
title: pget
path: /code/functions/pget
description: gets pixel color

function:
  category: graphics
  input:
    - name: x
      type: number
      desc: x position
    - name: y
      type: number
      desc: y position
  examples:
    read white pixel: |
      pset(0, 0, 7)
      print(pget(0, 0))
---
