---
title: cls
path: /functions/cls
description: clears the screen

function:
  category: draw
  input:
    - name: col
      type: number
      desc: fill color
      default: draw state color
  output:
    type: nil
  examples:
    red screen: |
      cls(8)
    pink screen: |
      cls(14)
---
