---
name: min
path: /functions/min
type: math
desc: finds the smallest
args:
- name: one
  type: number
  desc: the first number
- name: two
  type: number
  desc: the second number
returns:
  type: number
  desc: whichever input number is smallest
examples:
  inputs vs outputs: |
    -- prints "0"
    print(min(0, 1))

    -- prints "1"
    print(min(2, 1))

    -- prints "-1"
    print(min(-1, 1))

    -- prints "-2"
    print(min(-1, -2))

    -- prints "-2"
    print(min(0, -2))
---
