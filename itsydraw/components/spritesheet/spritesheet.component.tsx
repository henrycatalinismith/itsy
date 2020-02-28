import { selectColor } from "@highvalley.systems/itsydraw/store/color"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import {
  drawLine,
  drawPixel,
  PartialSpritesheetState,
  selectSpritesheet,
  SpritesheetState,
  updateSpritesheet,
} from "@highvalley.systems/itsydraw/store/spritesheet"
import {
  Palette,
  PaletteIndex,
  SpritesheetPixelIndex,
} from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import styles from "./spritesheet.module.scss"

interface SpritesheetProps {
  color: PaletteIndex
  palette: Palette
  spritesheet: SpritesheetState
  drawLine: (
    x0: SpritesheetPixelIndex,
    y0: SpritesheetPixelIndex,
    x1: SpritesheetPixelIndex,
    y1: SpritesheetPixelIndex,
    color: PaletteIndex
  ) => void
  drawPixel: (
    x: SpritesheetPixelIndex,
    y: SpritesheetPixelIndex,
    color: PaletteIndex
  ) => void
  updateSpritesheet: (changes: PartialSpritesheetState) => void
}

const mapStateToProps = (state) => ({
  color: selectColor(state),
  palette: selectPalette(state),
  spritesheet: selectSpritesheet(state),
})

const mapDispatchToProps = {
  drawLine,
  drawPixel,
  updateSpritesheet,
}

export function Spritesheet({
  color,
  palette,
  spritesheet,
  drawPixel,
  drawLine,
  updateSpritesheet,
}: SpritesheetProps): React.ReactElement {
  const repainting = React.useRef(false)
  const changes = React.useRef<
    {
      [i in SpritesheetPixelIndex]?: {
        [i in SpritesheetPixelIndex]?: PaletteIndex
      }
    }
  >({})

  const update = _.debounce(() => {
    updateSpritesheet(changes.current)
    changes.current = {}
  }, 100)

  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const drawing = React.useRef(false)
  const last = React.useRef<{
    x: SpritesheetPixelIndex
    y: SpritesheetPixelIndex
  }>({ x: undefined, y: undefined })
  const [scale, setScale] = React.useState(1)

  console.log("RENDER")

  React.useEffect(() => {
    if (canvas.current) {
      canvas.current.width = canvas.current.clientWidth
      canvas.current.height = canvas.current.clientHeight
      ctx.current = canvas.current.getContext("2d")
      setScale((canvas.current.clientWidth / 128) * 1)
      repaint()
    }
  }, [])

  // React.useEffect(() => {
  // console.log(spritesheet[2][11])
  // repaint()
  // })

  React.useEffect(() => {
    ctx.current.scale(scale, scale)
    repaint()
  }, [scale])

  const cls = React.useCallback(
    (i = 0) => {
      const color = palette[i].hex
      ctx.current.fillStyle = color
      ctx.current.fillRect(0, 0, 128, 128)
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
      if (!repainting.current) {
        if (!changes.current[x]) {
          changes.current[x] = {}
        }
        changes.current[x][y] = i
        update()
      }
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
    repainting.current = true
    Object.entries(spritesheet).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        pset(x as any, y as any, pixel)
      })
    })
    repainting.current = false
  }, [scale])

  const onTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor(
        (event.touches[0].clientX - rect.left) / scale
      ) as SpritesheetPixelIndex
      const y = Math.floor(
        (event.touches[0].clientY - rect.top) / scale
      ) as SpritesheetPixelIndex

      if (x < 0 || x > 127 || y < 0 || y > 127) {
        return
      }

      if (x === last.current.x && y === last.current.y) {
        return
      }

      drawing.current = true

      pset(x, y, color)
      // drawPixel(x, y, color)
      last.current = { x, y }
    },
    [scale, color]
  )

  const onTouchMove = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor(
        (event.touches[0].clientX - rect.left) / scale
      ) as SpritesheetPixelIndex
      const y = Math.floor(
        (event.touches[0].clientY - rect.top) / scale
      ) as SpritesheetPixelIndex

      if (x < 0 || x > 127 || y < 0 || y > 127) {
        return
      }

      if (x === last.current.x && y === last.current.y) {
        return
      }

      drawing.current = true

      if (last.current.x === undefined) {
        pset(x, y, color)
        // drawPixel(x, y, color)
      } else {
        line(last.current.x, last.current.y, x, y, color)
        // drawLine(last.current.x, last.current.y, x, y, color)
      }

      last.current = { x, y }
    },
    [scale, color]
  )

  const props: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onTouchStart,
    onTouchMove,
  }

  return <canvas {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
