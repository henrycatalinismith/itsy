---
title: upper
path: /code/functions/upper
description: uppercases a string

function:
  category: string
  input:
    - name: s
      category: string
      desc: input string
  output:
    category: string
    desc: upper case version of s
  examples:
    inputs vs outputs: |
      -- prints "abcdefghijklmn"
      print("abcdefghijklmn")

      -- prints "ABCDEFGHIJKLMN"
      print(upper("abcdefghijklmn"))
---
