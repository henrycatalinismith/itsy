---
title: peek
path: /code/functions/peek
description: reads a byte

function:
  category: memory
  input:
    - name: addr
      type: table
      desc: memory address
  output:
    type: number
    desc: the value at the requested memory address
  examples:
    peeking at video memory addresses: |
      print(peek(0x7020))
      circfill(64, 64, 4, 7)
      print(peek(0x7020))
---
