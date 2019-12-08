import React from "react"
import Pixelflip from "@itsy.studio/pixelflip/regular"
import { Svg, G, Path } from "react-native-svg"

import colors from "../../constants/colors"

export default ({
  children,
  fontSize = 16,
  color = colors[0],
  x = 0,
  y = 0,
  scale = 1,
  strokeMultiplier = 1,
  borderColor = undefined,
  borderMultiplier = 0,
}) => {
  const props = {
    Svg,
    G,
    Path,
    fontSize,
  }
  return (
    <Pixelflip {...props}>{children}</Pixelflip>
  )
}
