---
title: circfill
path: /functions/circfill
type: draw
description: draws a circle
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
  desc: fill color
  base: draw state color
examples:
  7 concentric circles: |
    circfill(64, 64, 64, 7)
    circfill(64, 64, 32, 8)
    circfill(64, 64, 16, 9)
    circfill(64, 64, 8, 10)
    circfill(64, 64, 4, 11)
    circfill(64, 64, 2, 12)
    circfill(64, 64, 1, 14)
---
