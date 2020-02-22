---
title: tonum
path: /functions/tonum
description: converts to number

function:
  category: misc
  input:
    - name: str
      category: string
      desc: any string
  output:
    type: number
    desc: numerical representation of the input string
  examples:
    inputs vs outputs: |
      -- 12345
      print(tonum('12345'))

      -- -12345.67
      print(tonum('-12345.67'))

      -- 15
      print(tonum('0x0f'))

      -- 15.6709
      print(tonum('0x0f.abc'))

      -- 32767
      print(tonum('32767'))

      -- -32768
      print(tonum('99999'))

      -- nil
      print(tonum('xyz'))
---
