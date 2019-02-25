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
example: |
  table = {}

  print("TABLE SIZE: ", 8, 8, 12)
  print(#table, 52, 8, 14)

  print("add(table, 123456789)", 8, 16, 7)
  add(table, 123456789)

  print("TABLE SIZE: ", 8, 24, 12)
  print(#table, 52, 24, 14)

  print('add(table, "qwertyuiop")', 8, 32, 7)
  add(table, "qwertyuiop")

  print("TABLE SIZE: ", 8, 40, 12)
  print(#table, 52, 40, 14)

  print('add(table, { 123, 456, 789 })', 8, 48, 7)
  add(table, { 123, 456, 789 })

  print("TABLE SIZE: ", 8, 56, 12)
  print(#table, 52, 56, 14)

glitch: itsy-add
---

