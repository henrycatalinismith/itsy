import Pixelflip from "@highvalley.systems/pixlflip/regular"
import React from "react"
import { G, Path, Svg } from "react-native-svg"

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
