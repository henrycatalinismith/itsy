---
name: rectfill
path: /functions/rectfill
type: draw
desc: fills a rectangle
args:
- name: x0
  type: number
  desc: top left x
- name: y0
  type: number
  desc: top left y
- name: x1
  type: number
  desc: bottom right x
- name: y1
  type: number
  desc: bottom right y
- name: col
  type: number
  desc: fill color
  base: draw state color
examples:
  7 concentric rectangles: |
    rectfill(0, 0, 127, 127, 7)
    rectfill(1, 1, 126, 126, 8)
    rectfill(2, 2, 125, 125, 9)
    rectfill(4, 4, 123, 123, 10)
    rectfill(8, 8, 119, 119, 11)
    rectfill(16, 16, 111, 111, 12)
    rectfill(32, 32, 95, 95, 13)
    rectfill(64, 64, 63, 63, 14)
---

