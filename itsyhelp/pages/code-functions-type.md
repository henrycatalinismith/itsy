---
title: type
path: /code/functions/type
description: gets a value's type

function:
  category: misc
  input:
    - name: value
      type: any
      desc: any value
  output:
    category: string
    desc: the type of the input value
  examples:
    inputs vs outputs: |
      -- prints "number"
      print(type(12345))

      -- prints "string"
      print(type("cat"))

      -- prints "table"
      print(type({ 1, 2, 3 }))
---
