---
name: del
path: /functions/del
type: tables
desc: deletes from table
args:
- name: tbl
  type: table
  desc: the table
- name: k
  type: any
  desc: key to delete
returns:
  type: any
  desc: the value deleted
examples:
  plain: |
    table = { "a", "b", "c" }

    print("TABLE SIZE: ", 8, 8, 12)
    print(#table, 52, 8, 14)

    print("del(table, 2)", 8, 16, 7)
    del(table, 2)

    print("TABLE SIZE: ", 8, 24, 12)
    print(#table, 52, 24, 14)
---

