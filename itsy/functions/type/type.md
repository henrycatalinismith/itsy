---
title: type
path: /functions/type
type: misc
description: gets a value's type
args:
- name: value
  type: any
  desc: any value
returns:
  type: string
  desc: the type of the input value
examples:
  inputs vs outputs: |
    -- prints "number"
    print(type(12345))

    -- prints "string"
    print(type("cat"))

    -- prints "table"
    print(type({ 1, 2, 3 }))
---

