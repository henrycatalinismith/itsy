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
  base: x from previous call
- name: y
  type: number
  desc: y position
  base: y from previous call + 8
- name: col
  type: number
  desc: text color
  base: draw state color
examples:
  the mouse's tale: |
    print("       Fury said to a")
    print("     mouse, That he")
    print("    met in the")
    print("   house,")
    print('  "Let us')
    print("    both go to")
    print("     law:  I will")
    print("       prosecute")
    print("          YOU.  --Come,")
    print("           I'll take no")
    print("            denial; We")
    print("          must have a")
    print("        trial:  For")
    print("      really this")
    print("   morning I've")
    print("  nothing")
    print(' to do."')

  position and color: |
    print("HELLO!!", 32, 32, 15)
    print("Good Morning!", 32, 48, 14)

  border effect: |
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

