---
title: flr
path: /functions/flr
type: math
description: rounds down
args:
- name: num
  type: number
  desc: number to round down
returns:
  type: number
  desc: the input number rounded down to the next lowest integer
examples:
  inputs vs outputs: |
    print(flr(-99.9))  -- prints -100
    print(flr(-50.9))  -- prints -51
    print(flr(-1.1))   -- prints -2
    print(flr(-0.1))   -- prints -1
    print(flr(0))      -- prints 0
    print(flr(0.1))    -- prints 0
    print(flr(1.1))    -- prints 1
    print(flr(50.9))   -- prints 50
    print(flr(99.9))   -- prints 99

  graph demo: |
    y1 = 32
    y2 = 32

    cls(7)

    for x = 32,96 do
      y1 = y1 + -0.5
      y2 = y2 + flr(-0.5)

      line(x, 32, x, 64 - y2, 11)
      line(x, 32, x, 64 - y1, 12)

      pset(x, 64 - y1, 1)
      pset(x, 64 - y2, 3)
    end

    print("X", 64, 26, 2)
    print("Y", 28, 60, 2)
    print("FLR(-0.5)", 82, 100, 3)
    print("-0.5", 98, 60, 1)

    line(32, 32, 96, 32, 2)
    line(32, 96, 32, 32, 2)
---

