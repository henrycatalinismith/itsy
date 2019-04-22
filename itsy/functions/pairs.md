---
name: pairs
path: /functions/pairs
type: tables
desc: gets keys + values
args:
- name: tbl
  type: table
  desc: table to iterate
returns:
  type: function
  desc: an iterator representing the input table
examples:
  plain: |
    list = {
      a = 2,
      b = 4,
      c = 8,
      d = 16,
      e = 32,
      f = 64,
      g = 128,
    }
    for l, n in pairs(list) do
      print(l .. "=" .. n)
    end
---

