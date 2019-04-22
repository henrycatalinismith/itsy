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
  plain: |
    -- "hello"
    print(sub("hello there", 1, 5))
  defaults: |
    -- "there"
    print(sub("hello there", -5))
---

