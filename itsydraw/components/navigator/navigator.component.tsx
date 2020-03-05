import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { selectSpritesheet } from "@highvalley.systems/itsydraw/store/spritesheet"
import { selectZoom } from "@highvalley.systems/itsydraw/store/zoom"
import {
  Palette,
  PaletteIndex,
  Spritesheet,
  SpritesheetPixelIndex,
} from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import styles from "./navigator.module.scss"

interface NavigatorProps {
  palette: Palette
  spritesheet: Spritesheet
  zoom: number
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
  spritesheet: selectSpritesheet(state),
  zoom: selectZoom(state),
})

const mapDispatchToProps = {}

export function Navigator({
  palette,
  spritesheet,
  zoom,
}: NavigatorProps): React.ReactElement {
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const [scale, setScale] = React.useState(1)

  console.log("RENDER")

  React.useEffect(() => {
    if (canvas.current) {
      canvas.current.width = 128
      canvas.current.height = 128
      ctx.current = canvas.current.getContext("2d")
      repaint()
    }
  }, [spritesheet, zoom])

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
    },
    [palette, scale]
  )

  const repaint = React.useCallback(() => {
    cls(0)
    console.log("repainting")
    Object.entries(spritesheet).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        pset(x as any, y as any, pixel)
      })
    })

    ctx.current.strokeStyle = "#01ffff"
    ctx.current.lineWidth = 2
    ctx.current.rect(0, 0, 128 / zoom, 128 / zoom)
    ctx.current.stroke()
  }, [scale, spritesheet, zoom])

  const props: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
  }

  return <canvas {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)
