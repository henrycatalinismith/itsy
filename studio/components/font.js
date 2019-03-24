import React from "react"
import { Svg } from "expo"

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

const Character = ({
  children,
  color,
  x = 0,
  y = 0,
  scale = 1,
  strokeMultiplier = 1,
  borderColor = undefined,
  borderMultiplier = 0,
}) => {
  const g = (...paths) => (
    <Svg.G fill="none" strokeLinecap="square" strokeLinejoin="round">
      {(borderColor && borderMultiplier > 0) && (
        <Svg.G
          stroke={borderColor}
          strokeWidth={borderMultiplier}
        >{paths}</Svg.G>
      )}
      <Svg.G stroke={color} strokeWidth={scale * strokeMultiplier}>{paths}</Svg.G>
    </Svg.G>
  )

  let i = 0
  const path = (...points) => {
    return (
      <Svg.Path
        key={`letter-${i++}`}
        d={`M${points.map(p => [
          1 * (p[0] + x),
          1 * (p[1] + y),
        ]).join(" L")}`}
      />
    )
  }

  switch (children) {
    case "0": return g(
      path([0,0], [2,0], [2,4], [0,4], [0,1])
    )

    case "1": return g(
      path([0,0], [1,0], [1,3]),
      path([0,4], [2,4])
    )

    case "2": return g(
      path([0,0], [2,0], [2,2], [0,2], [0,4], [2,4])
    )

    case "3": return g(
      path([0,0], [2,0], [2,4], [0,4]),
      path([1,2], [1,2])
    )

    case "4": return g(
      path([0,0], [0,2], [1,2]),
      path([2,0], [2,4])
    )

    case "5": return g(
      path([2,0], [0,0], [0,2], [2,2], [2,4], [0,4])
    )

    case "6": return g(
      path([0,0], [0,4], [2,4], [2,2], [1,2])
    )

    case "7": return g(
      path([0,0], [2,0], [2,4])
    )

    case "8": return g(
      path([0,0], [2,0], [2,4], [0,4], [0,1]),
      path([1,2], [1,2])
    )

    case "9": return g(
      path([1,2], [0,2], [0,0], [2,0], [2,4])
    )

    case "!": return g(
      path([1,0], [1,2]),
      path([1,4], [1,4])
    )

    case "@": return g(
      path([2,2], [2,1]),
      path([1,0], [1,0]),
      path([0,1], [0,3]),
      path([1,4], [2,4])
    )

    case "\"": return g(
      path([0,0], [0,4]),
      path([2,0], [2,4]),
      path([1,1], [1,1]),
      path([1,3], [1,3])
    )

    case "$": return g(
      path([3,0], [0,0], [0,1], [1,1], [1,2], [2,2], [2,3], [0,3]),
      path([1,4], [1,4])
    )

    case "%": return g(
      path([0,0], [0,0]),
      path([0,4], [0,3]),
      path([2,0], [2,1]),
      path([2,4], [2,4]),
      path([1,2], [1,2])
    )

    case "&": return g(
      path([1,2], [1,0], [0,0], [0,4], [2,4], [2,3]),
    )

    case "'": return g(
      path([1,0], [1,0]),
      path([0,1], [0,1])
    )

    case "(": return g(
      path([1,0], [1,0]),
      path([1,4], [1,4]),
      path([0,1], [0,3])
    )

    case ")": return g(
      path([1,0], [1,0]),
      path([1,4], [1,4]),
      path([2,1], [2,3])
    )

    case "*": return g(
      path([1,1], [1,3]),
      path([0,2], [2,2]),
      path([0,0], [0,0]),
      path([2,0], [2,0]),
      path([0,4], [0,4]),
      path([2,4], [2,4])
    )

    case "+": return g(
      path([1,1], [1,3]),
      path([0,2], [2,2])
    )

    case "#": return g(
      path([0,0], [0,1]),
      path([2,0], [2,1])
    )

    case "-": return g(
      path([0,2], [2,2])
    )

    case ",": return g(
      path([1,3], [1,3]),
      path([0,4], [0,4])
    )

    case ".": return g(
      path([1,4], [1,4])
    )

    case "/": return g(
      path([0,4], [0,4]),
      path([2,0], [2,0]),
      path([1,1], [1,3])
    )

    case ":": return g(
      path([1,1], [1,1]),
      path([1,3], [1,3])
    )

    case ";": return g(
      path([1,1], [1,1]),
      path([1,3], [1,3]),
      path([0,4], [0,4])
    )

    case "<": return g(
      path([2,0], [2,0]),
      path([2,4], [2,4]),
      path([1,1], [1,1]),
      path([1,3], [1,3]),
      path([0,2], [0,2])
    )

    case ">": return g(
      path([0,0], [0,0]),
      path([0,4], [0,4]),
      path([1,1], [1,1]),
      path([1,3], [1,3]),
      path([2,2], [2,2])
    )

    case "?": return g(
      path([0,0], [2,0], [2,2], [1,2]),
      path([1,4], [1,4])
    )

    case "^": return g(
      path([0,1], [0,1]),
      path([1,0], [1,0]),
      path([2,1], [2,1])
    )

    case "_": return g(
      path([0,4], [2,4])
    )

    case "{": return g(
      path([2,0], [1,0], [1,4], [2,4]),
      path([0,2], [0,2])
    )

    case "}": return g(
      path([0,0], [1,0], [1,4], [0,4]),
      path([2,2], [2,2])
    )

    case "|": return g(
      path([1,0], [1,4])
    )

    case "~": return g(
      path([0,3], [0,2], [2,2], [2,1])
    )

    case "`": return g(
      path([1,0], [1,0]),
      path([2,1], [2,1])
    )

    case "[": return g(
      path([1,0], [0,0], [0,4], [1,4])
    )

    case "]": return g(
      path([1,0], [2,0], [2,4], [1,4])
    )

    case "\\": return g(
      path([2,4], [2,4]),
      path([0,0], [0,0]),
      path([1,1], [1,3])
    )

    case "A": return g(
      path([0,4], [0,0], [2,0], [2,4]),
      path([0,2], [2,2])
    )

    case "B": return g(
      path([2,1], [2,0], [0,0], [0,4], [2,4], [2,3]),
      path([1,2], [1,2])
    )

    case "C": return g(
      path([2,0], [1, 0], [0,1], [0,3], [1,4], [2,4]),
    )

    case "D": return g(
      path([1,0], [0,0], [0,4], [1,4]),
      path([2,1], [2,3])
    )

    case "E": return g(
      path([2,0], [0,0], [0,4], [2,4]),
      path([0,2], [1,2])
    )

    case "F": return g(
      path([2,0], [0,0], [0,4]),
      path([0,2], [1,2])
    )

    case "G": return g(
      path([1,0], [2,0]),
      path([0,1], [0,4], [2,4], [2,3])
    )

    case "H": return g(
      path([0,0], [0,4]),
      path([2,0], [2,4]),
      path([1,2], [1,2])
    )

    case "I": return g(
      path([0,0], [2,0]),
      path([0,4], [2,4]),
      path([1,1], [1,3])
    )

    case "J": return g(
      path([0,0], [2,0]),
      path([0,4], [1,4], [1,1])
    )

    case "K": return g(
      path([0,0], [0,4]),
      path([1,2], [1,2]),
      path([2,0], [2,1]),
      path([2,3], [2,4])
    )

    case "L": return g(
      path([0,0], [0,4], [2,4])
    )

    case "M": return g(
      path([0,4], [0,0], [2,0], [2,4]),
      path([1,1], [1,1])
    )

    case "N": return g(
      path([0,4], [0,0], [1,0]),
      path([2,1], [2,4])
    )

    case "O": return g(
      path([0,1], [0,4], [1,4]),
      path([1,0], [2,0], [2,3])
    )

    case "P": return g(
      path([0,4], [0,0], [2,0], [2,2], [1,2])
    )

    case "Q": return g(
      path([0,1], [0,3], [1,3], [1,4], [2,4]),
      path([1,0], [1,0]),
      path([2,1], [2,2])
    )

    case "R": return g(
      path([0,4], [0,0], [2,0], [2,1]),
      path([1,2], [1,2]),
      path([2,3], [2,4])
    )

    case "S": return g(
      path([1,0], [2,0]),
      path([0,1], [0,2], [2,2], [2,3]),
      path([0,4], [1,4])
    )

    case "T": return g(
      path([0,0], [2,0]),
      path([1,1], [1,4])
    )

    case "U": return g(
      path([0,0], [0,3], [1,4], [2,4], [2,0])
    )

    case "V": return g(
      path([0,0], [0,3], [2,3], [2,0]),
      path([1,4], [1,4])
    )

    case "W": return g(
      path([0,0], [0,4], [2,4], [2,0]),
      path([1,3], [1,3])
    )

    case "X": return g(
      path([0,0], [0,1]),
      path([2,0], [2,1]),
      path([1,2], [1,2]),
      path([0,3], [0,4]),
      path([2,3], [2,4])
    )

    case "Y": return g(
      path([2,0], [2,4], [0,4]),
      path([0,0], [0,2], [1,2])
    )

    case "Z": return g(
      path([0,0], [2,0], [2,1]),
      path([1,2], [1,2]),
      path([2,4], [0,4], [0,3])
    )

    case "a": return g(
      path([0,4], [0,1], [2,1], [2,4]),
      path([0,3], [2,3])
    )

    case "b": return g(
      path([0,1], [1,1], [1,2], [0,2], [0,4], [2,4], [2,3])
    )

    case "c": return g(
      path([2,1], [0,1], [0,4], [2,4])
    )

    case "d": return g(
      path([0,1], [0,4], [1,4], [2,3], [2,2], [1,1], [0,1]),
    )

    case "e": return g(
      path([2,1], [0,1], [0,2], [1,2], [0,2], [0,4], [2,4]),
    )

    case "f": return g(
      path([2,1], [0,1], [0,4]),
      path([1,2], [1,2])
    )

    case "g": return g(
      path([2,1], [0,1], [0,4], [2,4], [2,3])
    )

    case "h": return g(
      path([0,1], [0,4]),
      path([2,1], [2,4]),
      path([0,3], [2,3])
    )

    case "i": return g(
      path([0,1], [2,1]),
      path([0,4], [2,4]),
      path([1,2], [1,3])
    )

    case "j": return g(
      path([0,1], [2,1]),
      path([0,4], [1,4], [1,2])
    )

    case "j": return g(
      path([0,1], [2,1]),
      path([0,4], [1,4], [1,2])
    )

    case "k": return g(
      path([0,1], [0,4]),
      path([1,2], [1,2]),
      path([2,1], [2,1]),
      path([2,3], [2,4])
    )

    case "l": return g(
      path([0,1], [0,4], [2,4])
    )

    case "m": return g(
      path([0,4], [0,1], [1,2], [2,1], [2,4]),
    )

    case "n": return g(
      path([0,4], [0,1], [1,1], [2,2], [2,4])
    )

    case "o": return g(
      path([0,4], [1,4], [2,3], [2,1], [1,1], [0,2], [0,4]),
    )

    case "p": return g(
      path([0,4], [0,1], [2,1], [2,3], [1,3])
    )

    case "q": return g(
      path([0,2], [0,3], [1,3], [1,4], [2,4]),
      path([1,1], [1,1]),
      path([2,2], [2,2])
    )

    case "r": return g(
      path([0,4], [0,1], [2,1], [2,2], [1,3], [2,4]),
    )

    case "s": return g(
      path([2,1], [1,1], [0,2], [2,3], [1,4], [0,4]),
    )

    case "t": return g(
      path([0,1], [2,1]),
      path([1,2], [1,4])
    )

    case "u": return g(
      path([0,1], [0,3], [1,4], [2,4], [2,1])
    )

    case "v": return g(
      path([0,1], [0,3], [1,4], [2,3], [2,1]),
    )

    case "w": return g(
      path([0,1], [0,4], [2,4], [2,1]),
      path([1,3], [1,3])
    )

    case "x": return g(
      path([0,1], [0,1]),
      path([2,1], [2,1]),
      path([1,2], [1,2]),
      path([0,3], [0,4]),
      path([2,3], [2,4])
    )

    case "y": return g(
      path([2,1], [2,4], [0,4]),
      path([0,1], [0,2], [1,2])
    )

    case "z": return g(
      path([0,1], [2,1], [2,2]),
      path([2,4], [0,4], [0,3])
    )

    default: return g()
  }
}

