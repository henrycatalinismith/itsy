---
name: touchy
path: /functions/touchy
type: input
desc: gets y position
returns:
  type: number
  desc: the y position where the player is touching
examples:
  interactive demo (touch the square): |
    function _draw()
      if touch() then
        y = touchy()
        cls(1)
        line(0, y, 127, y, 14)
      else
        cls(5)
      end
    end
---

