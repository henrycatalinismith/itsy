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

  return (
    <svg style={style} viewBox={viewBox}>
      {lines.map((line, y) => {
        const chars = line.split("")
        return chars.map((char, x) => {

          const layers = [{
            scale: 0.5,
            color: pico8[0],
            x: x * 5,
            y: 2,
            width: 1.4,
          }, {
            scale: 0.5,
            color: pico8[7],
            x: x * 5,
            y: 2,
            width: 0.50,
          }]

          const key = `${x}-${y}`
          return (
            <Glyph
              key={key}
              layers={layers}
            >{char}</Glyph>
          )
        })
      })}
    </svg>
  )
}
