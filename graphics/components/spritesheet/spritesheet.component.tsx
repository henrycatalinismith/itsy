import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import {
  PaletteIndex,
  PaletteState,
  selectPalette,
} from "@itsy.studio/graphics/store/palette"
import {
  SpritesheetPixelIndex,
  SpritesheetState,
  drawPixel,
  selectSpritesheet,
} from "@itsy.studio/graphics/store/spritesheet"
import styles from "./spritesheet.module.scss"

interface SpritesheetProps {
  palette: PaletteState
  spritesheet: SpritesheetState
  drawPixel: (x: SpritesheetPixelIndex, y: SpritesheetPixelIndex) => void
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
  spritesheet: selectSpritesheet(state),
})

const mapDispatchToProps = {
  drawPixel,
}

export function Spritesheet({
  palette,
  spritesheet,
  drawPixel,
}: SpritesheetProps): React.ReactElement {
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const drawing = React.useRef(false)
  const last = React.useRef<{
    x: SpritesheetPixelIndex
    y: SpritesheetPixelIndex
  }>({ x: undefined, y: undefined })
  const [scale, setScale] = React.useState(1)

  React.useEffect(() => {
    if (canvas.current) {
      canvas.current.width = canvas.current.clientWidth
      canvas.current.height = canvas.current.clientHeight
      ctx.current = canvas.current.getContext("2d")
      setScale((canvas.current.clientWidth / 128) * 2)
      repaint()
    }
  }, [])

  React.useEffect(() => {
    ctx.current.scale(scale, scale)
    repaint()
  }, [scale])

  const cls = React.useCallback(
    (i = 0) => {
      const color = palette[i].hex
      ctx.current.fillStyle = color
      ctx.current.fillRect(0, 0, 64, 64)
    },
    [scale]
  )

  const pset = React.useCallback(
    (x: SpritesheetPixelIndex, y: SpritesheetPixelIndex, i: PaletteIndex) => {
      const color = palette[i].hex
      ctx.current.strokeStyle = color
      ctx.current.fillStyle = color
      ctx.current.fillRect(
        parseInt(x.toString(), 10),
        parseInt(y.toString(), 10),
        1,
        1
      )
    },
    [scale]
  )

  const line = React.useCallback(
    (
      x0: SpritesheetPixelIndex,
      y0: SpritesheetPixelIndex,
      x1: SpritesheetPixelIndex,
      y1: SpritesheetPixelIndex,
      i: PaletteIndex
    ) => {
      const dx = Math.abs(x1 - x0),
        sx = x0 < x1 ? 1 : -1
      const dy = Math.abs(y1 - y0),
        sy = y0 < y1 ? 1 : -1
      let err = (dx > dy ? dx : -dy) / 2

      while (true) {
        pset(x0, y0, i)
        if (x0 === x1 && y0 === y1) break
        var e2 = err
        if (e2 > -dx) {
          err -= dy
          x0 += sx
        }
        if (e2 < dy) {
          err += dx
          y0 += sy
        }
      }
    },
    [scale]
  )

  const repaint = React.useCallback(() => {
    cls(0)
    Object.entries(spritesheet).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        pset(x as any, y as any, pixel)
      })
    })
  }, [scale])

  const onMouseMove = React.useCallback(
    (event: MouseEvent) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor(
        (event.clientX - rect.left) / scale
      ) as SpritesheetPixelIndex
      const y = Math.floor(
        (event.clientY - rect.top) / scale
      ) as SpritesheetPixelIndex

      if (x < 0 || x > 63 || y < 0 || y > 63) {
        return
      }

      drawing.current = true

      // drawPixel(x as SpritesheetPixelIndex, y as SpritesheetPixelIndex)
      if (last.current.x === undefined) {
        pset(x, y, 12)
      } else {
        line(last.current.x, last.current.y, x, y, 12)
      }

      last.current = { x, y }
    },
    [scale]
  )

  const props: any = {
    className: cx(styles.canvas),
    ref: canvas,
    onMouseMove,
  }

  return <canvas {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
