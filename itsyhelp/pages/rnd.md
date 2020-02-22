---
title: rnd
path: /functions/rnd
description: random number

function:
  category: math
  input:
    - name: m
      type: number
      desc: optional maximum
  output:
    type: number
    desc: a random number
  examples:
    some random numbers: |
      print(rnd())
      print(rnd())
      print(rnd(6))
---
