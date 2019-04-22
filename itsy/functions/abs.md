---
name: abs
path: /functions/abs
type: math
desc: removes minus sign
args:
- name: num
  type: number
  desc: any number
returns:
  type: number
  desc: absolute value of input number
examples:
  plain: |
    print(abs(-999))  -- prints 999
    print(abs(-50))   -- prints 50
    print(abs(-1))    -- prints 1
    print(abs(-0.1))  -- prints 0.1
    print(abs(0))     -- prints 0
    print(abs(0.1))   -- prints 0.1
    print(abs(1))     -- prints 1
    print(abs(50))    -- prints 50
    print(abs(999))   -- prints 999

glitch: itsy-abs
---
