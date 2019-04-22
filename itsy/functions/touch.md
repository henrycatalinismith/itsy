---
name: touch
path: /functions/touch
type: input
desc: detects touches
returns:
  type: boolean
  desc: true when the player touches the screen
examples:
  interactive demo (touch the square): |
    function _draw()
      if touch() then
        cls(12)
      else
        cls(1)
      end
    end
glitch: itsy-touch
---

