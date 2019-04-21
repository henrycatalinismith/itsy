---
name: camera
path: /functions/camera
type: graphics
desc: moves the camera
args:
- name: x
  type: number
  desc: horizontal offset
- name: y
  type: number
  desc: vertical offset
examples:
  plain: |
    camera(16, 16)
    circfill(16, 16, 32, 12)

    camera(-64, -64)
    circfill(0, 0, 32, 13)

    camera(0, 0)
    circfill(127, 127, 32, 14)
---

