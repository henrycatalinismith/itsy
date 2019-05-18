---
name: cos
path: /functions/cos
type: math
desc: calculates cosine
args:
- name: angle
  type: number
  desc: from 0 to 1
returns:
  type: number
  desc: the cosine of the input angle
examples:
  inputs vs outputs: |
    print(cos(0))
    print(cos(3.141592))
  animated demo: |
    function _init()
      x = 0
      y = 0
    end

    function _tick()
      x = (x + 1) % 127
      y = 64 - cos(x / 20) * 64
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

