---
title: camera
path: /functions/camera
description: moves the camera

function:
  category: graphics
  input:
    - name: x
      type: number
      desc: horizontal offset
    - name: y
      type: number
      desc: vertical offset
  output:
    type: nil
  examples:
    3 camera positions & 3 circles: |
      -- top corner blue circle
      camera(16, 16)
      circfill(16, 16, 32, 12)

      -- center dark purple circle
      camera(-64, -64)
      circfill(0, 0, 32, 13)

      -- bottom corner pink circle
      camera(0, 0)
      circfill(127, 127, 32, 14)
---
