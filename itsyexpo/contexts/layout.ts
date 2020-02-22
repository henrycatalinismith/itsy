import React from "react"
import { LayoutRectangle } from "react-native"

const defaultLayout: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

const LayoutContext = React.createContext(defaultLayout)

export default LayoutContext
