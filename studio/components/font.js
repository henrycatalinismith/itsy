import React from "react"
import { Svg } from "expo"

import Character from "./character"
import colors from "../constants/colors"

export default ({
  children,
  fontSize = 16,
  color = colors[0],
  x = 0,
  y = 0,
  scale = 1,
  strokeMultiplier = 1.08,
  borderColor = undefined,
  borderMultiplier = 0,
}) => {

  const string = typeof children === "string"
    ? children
    : children.toString()

  let viewbox = [
    -0.5,
    -0,
    (string.length * 3) + (Math.max(0, string.length - 1)),
    4
  ]

  if (borderColor) {
    viewbox[0] -= borderMultiplier/2
    viewbox[1] -= borderMultiplier/2
    viewbox[2] += borderMultiplier
    viewbox[3] += borderMultiplier
  }

  viewbox = viewbox.join("\n")

  const pixelSize = fontSize / 5

  const fontWidth = fontSize * 0.6
  const fontHeight = fontSize

  const svgWidth = (
    (fontWidth * string.length)
    + (pixelSize * Math.max(0, string.length - 1))
  )
  const svgHeight = fontHeight

  const letters = string.split("").map((letter, i) => {
    return (
      <Character
        key={`${i}${letter}`}
        x={x + (i * 4)}
        y={y}
        color={color}
        borderColor={borderColor}
        borderMultiplier={borderMultiplier}
      >{letter}</Character>
    )
  })

  return (
    <Svg width={svgWidth} height={svgHeight} viewBox={viewbox}>
      {letters}
    </Svg>
  )
}

