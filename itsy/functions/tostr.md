---
name: tostr
path: /functions/tostr
type: misc
desc: converts to string
args:
- name: val
  type: any
  desc: any value
returns:
  type: string
  desc: string representation of the input value
examples:
  decimals: |
    print(tostr(12345))     -- "12345"
    print(tostr(-12345.67)) -- "-12345.67"
  hex: |
    print(tostr(0x0f))  -- "15"
  booleans: |
    print(tostr(true))   -- "true"
    print(tostr(false))  -- "false"
  nil: |
    print(tostr(nil))  -- "nil"
  tables: |
    print(tostr({1, 2, 3})) -- "table: 0xXXXXXX"
---

