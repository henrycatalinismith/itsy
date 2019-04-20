---
name: upper
path: /functions/upper
type: string
desc: uppercases a string
args:
- name: s
  type: string
  desc: input string
returns:
  type: string
  desc: upper case version of s
example: |
  quiet_alphabet = "abcdefghijklmnopqrstuvwxyz"
  shouty_alphabet = upper(quiet_alphabet)
  print(quiet_alphabet, 16, 58, 5)
  print(shouty_alphabet, 16, 70, 7)
---

