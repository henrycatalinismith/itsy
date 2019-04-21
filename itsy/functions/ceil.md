---
name: ceil
path: /functions/ceil
type: math
desc: rounds up
args:
- name: num
  type: number
  desc: number to round up
returns:
  type: number
  desc: the input number rounded up to the next highest integer
examples:
  graphical: |
    y1 = 96
    y2 = 96

    cls(7)

    for x = 32,96 do
      y1 = y1 - 0.5
      y2 = y2 - ceil(0.5)

      line(x, 96, x, y2, 11)
      line(x, 96, x, y1, 12)

      pset(x, y1, 1)
      pset(x, y2, 3)
    end

    print("X", 64, 98, 2)
    print("Y", 28, 60, 2)
    print("CEIL(0.5)", 88, 24, 3)
    print("0.5", 98, 60, 1)

    line(32, 96, 96, 96, 2)
    line(32, 96, 32, 32, 2)
---
