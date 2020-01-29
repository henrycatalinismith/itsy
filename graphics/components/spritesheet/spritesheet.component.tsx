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
    console.log("repaint")
    ctx.current.scale(scale, scale)
    repaint()
  }, [scale])

  const draw = React.useCallback(
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

  const repaint = React.useCallback(() => {
    Object.entries(spritesheet).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        draw(x as any, y as any, pixel)
      })
    })
  }, [scale])

  const onMouseMove = React.useCallback(
    (event: MouseEvent) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor((event.clientX - rect.left) / scale)
      const y = Math.floor((event.clientY - rect.top) / scale)

      if (x < 0 || x > 63 || y < 0 || y > 63) {
        return
      }

      // drawPixel(x as SpritesheetPixelIndex, y as SpritesheetPixelIndex)
      draw(x as any, y as any, 12)
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
