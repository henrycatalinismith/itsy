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
example: |
  print("HELLO!!", 2, 2, 15)
  print("Have a lovely day", 8, 10, 14)

  for i = 0, 2 do
    for j = 0, 2 do
      if i ~= 1 or j ~= 1 then
        print("you got this!", 16 + i, 18 + j, 7)
      end
    end
  end

  print("you got this!", 16 + 1,18 + 1, 12)

---

