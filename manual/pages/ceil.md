---
title: ceil
path: /functions/ceil
description: rounds up

function:
  category: math
  input:
    - name: num
      type: number
      desc: number to round up
  output:
    type: number
    desc: the input number rounded up to the next highest integer
  examples:
    inputs vs outputs: |
      print(ceil(-99.9))  -- prints -99
      print(ceil(-50.9))  -- prints -50
      print(ceil(-1.1))   -- prints -1
      print(ceil(-0.1))   -- prints 0
      print(ceil(0))      -- prints 0
      print(ceil(0.1))    -- prints 1
      print(ceil(1.1))    -- prints 2
      print(ceil(50.9))   -- prints 51
      print(ceil(99.9))   -- prints 100

  graph demo: |
    y1 = 96
    y2 = 96

    cls(7)

    for x = 32,96 do
      y1 = y1 - 0.5
      y2 = y2 - ceil(0.5)

      line(x, 96, x, y2, 11)
      line(x, 96, x, y1, 12)

      pset(x, y1, 1)
      pset(x, y2, 3)
    end

    print("X", 64, 98, 2)
    print("Y", 28, 60, 2)
    print("CEIL(0.5)", 88, 24, 3)
    print("0.5", 98, 60, 1)

    line(32, 96, 96, 96, 2)
    line(32, 96, 32, 32, 2)
---
