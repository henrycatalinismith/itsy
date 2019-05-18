---
name: circ
path: /functions/circ
type: draw
desc: draws a circle
args:
- name: x
  type: number
  desc: center x
- name: y
  type: number
  desc: center y
- name: r
  type: number
  desc: radius
  base: 4
- name: col
  type: number
  desc: border color
  base: draw state color
examples:
  7 concentric circles: |
    circ(64, 64, 1, 14)
    circ(64, 64, 2, 12)
    circ(64, 64, 4, 11)
    circ(64, 64, 8, 10)
    circ(64, 64, 16, 9)
    circ(64, 64, 32, 8)
    circ(64, 64, 64, 7)
---

