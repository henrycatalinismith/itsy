---
title: del
path: /code/functions/del
description: deletes from table

function:
  category: tables
  input:
    - name: tbl
      type: table
      desc: the table
    - name: k
      type: any
      desc: key to delete
  output:
    type: any
    desc: the value deleted
  examples:
    deleting 3 values from a table: |
      table = {
        "a",
        "b",
        "c",
      }
      print(#table)   -- prints 3
      del(table, 2)   -- deletes "b"
      print(#table)   -- prints 2
      del(table, 2)   -- deletes "c"
      print(#table)   -- prints 1
      del(table, 1)   -- deletes "a"
      print(#table)   -- prints 0
---
