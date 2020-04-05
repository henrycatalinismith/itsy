---
title: tostr
path: /code/functions/tostr
description: converts to string

function:
  category: misc
  input:
    - name: val
      type: any
      desc: any value
  output:
    type: string
    desc: string representation of the input value
  examples:
    decimals: |
      -- "12345"
      print(tostr(12345))

      -- "-12345.67"
      print(tostr(-12345.67))
    hex: |
      -- "15"
      print(tostr(0x0f))
    booleans: |
      -- "true"
      print(tostr(true))

      -- "false"
      print(tostr(false))
    nil: |
      -- "nil"
      print(tostr(nil))
    tables: |
      -- "table: 0xXXXXXX"
      print(tostr({1, 2, 3}))
---
