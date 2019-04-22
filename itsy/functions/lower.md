---
name: lower
path: /functions/lower
type: string
desc: lowercases a string
args:
- name: s
  type: string
  desc: input string
returns:
  type: string
  desc: lower case version of s
examples:
  plain: |
    -- prints "ABCDEFGHIJKLMN"
    print("ABCDEFGHIJKLMN")

    -- prints "abcdefghijklmn"
    print(lower("ABCDEFGHIJKLMN"))
---

