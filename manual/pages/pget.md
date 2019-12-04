---
title: pget
path: /functions/pget
type: graphics
description: gets pixel color
args:
- name: x
  type: number
  desc: x position
- name: y
  type: number
  desc: y position
examples:
  read white pixel: |
    pset(0, 0, 7)
    print(pget(0, 0))
---

