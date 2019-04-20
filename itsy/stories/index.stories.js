import React from "react"
import { storiesOf } from "@storybook/react"
import ItsyDecorator from "../components/ItsyDecorator"

storiesOf("Functions", module)
  .addDecorator(story => <ItsyDecorator>{story()}</ItsyDecorator>)

  .add("abs", () => `
    print("ABS(-50)", 4, 14, 7)
    print("=" .. abs(-50), 8, 22, 14)
  
    print("ABS(0)", 54, 14, 7)
    print("=" .. abs(0), 60, 22, 14)
  
    print("ABS(50)", 96, 14, 7)
    print("=" .. abs(50), 108, 22, 14)
  
    for x = -50, 50 do
      abs_x = abs(x)
      line(x + 64, 100 - abs_x, x + 64, 100, 1)
      pset(x + 64, 100 - abs_x, 12)
    end
  
    print("-50", 14, 102, 6)
    print("50", 108, 102, 6)
    line(14, 100, 114, 100, 5)
  
    print("0", 63, 102, 6)
  
    print("50", 56, 48, 6)
    line(64, 48, 64, 100, 5)
  `)

  .add("add", () => `
    table = {}

    print("TABLE SIZE: ", 8, 8, 12)
    print(#table, 52, 8, 14)

    print("add(table, 123456789)", 8, 16, 7)
    add(table, 123456789)

    print("TABLE SIZE: ", 8, 24, 12)
    print(#table, 52, 24, 14)

    print('add(table, "qwertyuiop")', 8, 32, 7)
    add(table, "qwertyuiop")

    print("TABLE SIZE: ", 8, 40, 12)
    print(#table, 52, 40, 14)

    print('add(table, { 123, 456, 789 })', 8, 48, 7)
    add(table, { 123, 456, 789 })

    print("TABLE SIZE: ", 8, 56, 12)
    print(#table, 52, 56, 14)
  `)

