---
title: add
path: /code/functions/add
description: adds to table

function:
  category: tables
  input:
    - name: tbl
      type: table
      desc: the table
    - name: v
      type: any
      desc: the new value
  output:
    type: any
    desc: the value added
  examples:
    adding 3 values to a table: |
      table = {}
      print(#table)   -- prints 0
      add(table, 123)
      print(#table)   -- prints 1
      add(table, "hi")
      print(#table)   -- prints 2
      add(table, {})
      print(#table)   -- prints 3
---
