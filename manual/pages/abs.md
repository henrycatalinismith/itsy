---
title: abs
path: /functions/abs
description: removes minus sign

function:
  category: math
  input:
    - name: num
      type: number
      desc: any number
  output:
    type: number
    desc: absolute value of input number
  examples:
    inputs vs outputs: |
      print(abs(-999))  -- prints 999
      print(abs(-50))   -- prints 50
      print(abs(-1))    -- prints 1
      print(abs(-0.1))  -- prints 0.1
      print(abs(0))     -- prints 0
      print(abs(0.1))   -- prints 0.1
      print(abs(1))     -- prints 1
      print(abs(50))    -- prints 50
      print(abs(999))   -- prints 999
---
