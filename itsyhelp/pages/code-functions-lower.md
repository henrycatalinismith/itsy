---
title: lower
path: /code/functions/lower
description: lowercases a string

function:
  category: string
  input:
    - name: s
      category: string
      desc: input string
  output:
    category: string
    desc: lower case version of s
  examples:
    inputs vs outputs: |
      -- prints "ABCDEFGHIJKLMN"
      print("ABCDEFGHIJKLMN")

      -- prints "abcdefghijklmn"
      print(lower("ABCDEFGHIJKLMN"))
---
