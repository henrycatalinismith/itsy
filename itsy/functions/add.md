---
name: add
path: /functions/add
type: tables
desc: adds to table
args:
- name: tbl
  type: table
  desc: the table
- name: v
  type: any
  desc: the new value
returns:
  type: any
  desc: the value added
examples:
  plain: |
    table = {}
    print(#table)   -- prints 0
    add(table, 123)
    print(#table)   -- prints 1
    add(table, "hi")
    print(#table)   -- prints 2
    add(table, {})
    print(#table)   -- prints 3

glitch: itsy-add
---
