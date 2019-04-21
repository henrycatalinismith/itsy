---
name: type
path: /functions/type
type: misc
desc: gets a value's type
args:
- name: value
  type: any
  desc: any value
returns:
  type: string
  desc: the type of the input value
examples:
  plain: |
    print(12345, 32, 8, 6)
    print(type(12345), 32, 16, 14)

    print("cat", 32, 32, 6)
    print(type("cat"), 32, 40, 14)

    print(tostr({ 1, 2 }), 32, 56, 6)
    print(type({ 1, 2 }), 32, 64, 14)
---

