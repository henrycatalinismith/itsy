import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"

export interface ToolboxToolContext {
  rect: Rect
}

const toolboxToolContext: ToolboxToolContext = {
  rect: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
}

export default React.createContext(toolboxToolContext)
