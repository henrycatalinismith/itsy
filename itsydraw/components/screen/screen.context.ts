import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"

export interface ScreenContext {
  rect: Rect
}

const screenContext: ScreenContext = {
  rect: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
}

export default React.createContext(screenContext)
