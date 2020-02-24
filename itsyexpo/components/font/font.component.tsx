import React from "react"
import { Svg, G, Path } from "react-native-svg"

import colors from "@highvalley.systems/palettes/pico8/original.es6"
import Pixelflip from "@highvalley.systems/pixlflip/regular"

interface FontProps {
  children: any
  fontSize?: number
  fg?: string
  bg?: string
}

export function Font({ children, fg, bg, fontSize = 16 }: FontProps) {
  const props = {
    Svg,
    G,
    Path,
    fontSize,
    fg,
    bg,
  }
  return <Pixelflip {...props}>{children}</Pixelflip>
}

export default Font