---
name: poke
path: /functions/poke
type: memory
desc: writes a byte
args:
- name: addr
  type: number
  desc: memory address
- name: value
  type: number
  desc: new value
examples:
  poking video memory addresses: |
    for x = 0,127 do
      for y = 0,127 do
        addr = (0x6000 + (
          (y * 64) + (x / 2)
        ))
        poke(addr, 0x2D)
      end
    end
---

