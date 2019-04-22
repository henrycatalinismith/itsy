---
name: rnd
path: /functions/rnd
type: math
desc: random number
args:
- name: m
  type: number
  desc: optional maximum
returns:
  type: number
  desc: a random number
examples:
  some random numbers: |
    print(rnd())
    print(rnd())
    print(rnd(6))
---

