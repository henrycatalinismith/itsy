---
name: tonum
path: /functions/tonum
type: misc
desc: converts to number
args:
- name: str
  type: string
  desc: any string
returns:
  type: number
  desc: numerical representation of the input string
examples:
  plain: |
    print(tonum('12345'))     -- 12345
    print(tonum('-12345.67')) -- -12345.67
    print(tonum('0x0f'))      -- 15
    print(tonum('0x0f.abc'))  -- 15.6709
    print(tonum('32767'))     -- 32767
    print(tonum('99999'))     -- -32768
    print(tonum('xyz'))       -- nil
---

