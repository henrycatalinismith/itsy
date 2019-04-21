---
name: touchy
path: /functions/touchy
type: input
desc: gets y position
returns:
  type: number
  desc: the y position where the player is touching
examples:
  interactive: |
    function _draw()
      if touch() then
        cls(1)
        line(0, touchy(), 127, touchy(), 14)
      else
        cls(5)
      end
    end
---

