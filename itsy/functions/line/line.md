---
name: line
path: /functions/line
type: draw
desc: draws a line
args:
- name: x0
  type: number
  desc: start x
  base: x1 from previous call
- name: y0
  type: number
  desc: start y
  base: y1 from previous call
- name: x1
  type: number
  desc: finish x
- name: y1
  type: number
  desc: finish y
- name: col
  type: number
  desc: line color
  base: draw state color
examples:
  red diamond: |
    line(63, 0, 126, 63, 8)
    line(126, 63, 63, 126, 8)
    line(63, 126, 0, 63, 8)
    line(0, 63, 63, 0, 8)
  default parameters: |
    color(8)
    line(63, 0, 126, 63)
    line(63, 126)
    line(0, 63)
    line(63, 0)
---
