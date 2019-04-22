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
  base: value from previous call
- name: y
  type: number
  desc: y position
  base: value from previous call + 8
- name: col
  type: number
  desc: text color
  base: draw state color
examples:
  plain: |
    print("HELLO!!", 32, 32, 15)
    print("Good Morning!", 32, 48, 14)

  graphical: |
    cls(13)
    for i = 0, 2 do
      for j = 0, 2 do
        if i ~= 1 or j ~= 1 then
          x = 40 + i
          y = 48 + j
          print("YOU WIN!", x, y, 1)
        end
      end
    end
    print("YOU WIN!", 41, 49, 12)

---

