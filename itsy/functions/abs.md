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
  desc: absolute value of [num]
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

  graphical: |
    print("ABS(-50)", 4, 14, 7)
    print("=" .. abs(-50), 8, 22, 14)

    print("ABS(0)", 54, 14, 7)
    print("=" .. abs(0), 60, 22, 14)

    print("ABS(50)", 96, 14, 7)
    print("=" .. abs(50), 108, 22, 14)

    for x = -50, 50 do
      abs_x = abs(x)
      line(x + 64, 100 - abs_x, x + 64, 100, 1)
      pset(x + 64, 100 - abs_x, 12)
    end

    print("-50", 14, 102, 6)
    print("50", 108, 102, 6)
    line(14, 100, 114, 100, 5)

    print("0", 63, 102, 6)

    print("50", 56, 48, 6)
    line(64, 48, 64, 100, 5)
glitch: itsy-abs
---
