---
name: sub
path: /functions/sub
type: string
desc: gets a substring
args:
- name: s
  type: string
  desc: input string
- name: start
  type: number
  desc: start of substring
- name: end
  type: number
  desc: end of substring
  base: -1
returns:
  type: string
  desc: substring of s
examples:
  the start of a string: |
    -- "hello"
    print(sub("hello there", 1, 5))
  the end of a string: |
    -- "there"
    print(sub("hello there", -5))
  the middle of a string: |
    -- "spoon"
    print(sub("one spoon farm", 4, 9))
---

