---
name: print
path: /functions/print
type: draw
desc: displays a message
args:
- name: str
  type: string
  desc: message to print
- name: x
  type: number
  desc: x position
- name: y
  type: number
  desc: y position
- name: col
  type: number
  desc: text color
examples:
  plain: |
    print("HELLO!!", 32, 32, 15)
    print("Have a lovely day", 32, 48, 14)

  graphical: |
    cls(13)
    for i = 0, 2 do
      for j = 0, 2 do
        if i ~= 1 or j ~= 1 then
          print("YOU CAN DO IT!", 40 + i, 48 + j, 1)
        end
      end
    end
    print("YOU CAN DO IT!", 40 + 1, 48 + 1, 12)

---

