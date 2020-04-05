---
title: poke
path: /code/functions/poke
description: writes a byte

function:
  category: memory
  input:
    - name: addr
      type: number
      desc: memory address
    - name: value
      type: number
      desc: new value
  output:
    type: nil
  examples:
    poking video memory addresses: |
      for x = 0,127 do
        for y = 0,127 do
          addr = (0x6000 + (
            (y * 64) + (x / 2)
          ))
          poke(addr, 0x2D)
        end
      end
---
