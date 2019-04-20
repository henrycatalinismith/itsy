---
name: touchx
path: /functions/touchx
type: input
desc: gets x position
returns:
  type: number
  desc: the x position where the player is touching
example: |
  function _draw()
    if touch() then
      cls(1)
      line(touchx(), 0, touchx(), 127, 14)
    else
      cls(5)
    end
  end
---

