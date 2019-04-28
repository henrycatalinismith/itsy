import React from "react"
import pico8 from "../palettes/pico8.es6"
import Glyph from "./glyph"

export default ({ children }) => {
  const style = {
    flex: 1,
  }

  const lines = children.split(/\n/)

  const viewBox = [
    -1,
    0,
    2.7 * lines[0].length - 1,
    4 * lines.length,
  ].join(" ")

  const glyphs = []
  lines.forEach((line, y) => {
    const chars = line.split("")
    chars.forEach((char, x) => {
      const xScale = 4.8

      const layers = [{
        scale: 0.5,
        color: pico8[0],
        x: x * xScale,
        y: 2,
        width: 1.4,
      }, {
        scale: 0.5,
        color: pico8[7],
        x: x * xScale,
        y: 2,
        width: 0.50,
      }]

      const key = `${x}-${y}`

      const props = {
        key,
        layers,
      }

      const glyph = React.createElement(Glyph, props, [char])
      glyphs.push(glyph)
    })
  })

  const props = {
    style,
    viewBox,
  }
  
  const svg = React.createElement("svg", props, glyphs)
  return svg
}
