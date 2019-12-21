---
title: max
path: /functions/max
description: finds the biggest

function:
  category: math
  input:
    - name: one
      type: number
      desc: the first number
    - name: two
      type: number
      desc: the second number
  output:
    type: number
    desc: whichever input number is biggest
  examples:
    inputs vs outputs: |
      -- prints "1"
      print(max(0, 1))   

      -- prints "2"
      print(max(2, 1))

      -- prints "1"
      print(max(-1, 1))  

      -- prints "-1"
      print(max(-1, -2)) 

      -- prints "0"
      print(max(0, -2))
---
