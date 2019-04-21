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
    shouty_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    quiet_alphabet = lower(shouty_alphabet)
    print(shouty_alphabet, 16, 58, 5)
    print(quiet_alphabet, 16, 70, 7)
---

