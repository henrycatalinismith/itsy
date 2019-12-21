---
title: sub
path: /functions/sub
description: gets a substring

function:
  category: string
  input:
    - name: s
      category: string
      desc: input string
    - name: start
      type: number
      desc: start of substring
    - name: end
      type: number
      desc: end of substring
      default: -1
  output:
    category: string
    desc: substring of s
  examples:
    the start of a string: |
      -- "hello"
      print(sub("hello there", 1, 5))
    the end of a string: |
      -- "there"
      print(sub("hello there", -5))
    the middle of a string: |
      -- "spoon"
      print(sub("one spoon farm", 4, 9))
---
