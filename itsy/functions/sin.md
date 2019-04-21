---
name: sin
path: /functions/sin
type: math
desc: calculates sine
args:
- name: angle
  type: number
  desc: from 0 to 1
returns:
  type: number
  desc: the sine of the input angle
examples:
  animated: |
    function _init()
      x = 0
      y = 0
    end

    function _tick()
      x = (x + 1) % 127
      y = 64 - sin(x / 20) * 64
    end

    function _draw()
      if x == 0 then
        cls(0)
      end
      line(x, 64, x, y, 1)
      line(0, 64, 127, 64, 2)
      pset(x, y, 8)
    end
---

