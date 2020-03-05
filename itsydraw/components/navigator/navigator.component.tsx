import {
  moveCamera,
  selectCamera,
  selectZoom,
} from "@highvalley.systems/itsydraw/store/camera"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { selectSpritesheet } from "@highvalley.systems/itsydraw/store/spritesheet"
import {
  Palette,
  PaletteIndex,
  Rect,
  Spritesheet,
  SpritesheetPixelIndex,
} from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import styles from "./navigator.module.scss"

interface NavigatorProps {
  camera: Rect
  moveCamera: (x: number, y: number) => void
  palette: Palette
  spritesheet: Spritesheet
  zoom: number
}

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  palette: selectPalette(state),
  spritesheet: selectSpritesheet(state),
  zoom: selectZoom(state),
})

const mapDispatchToProps = {
  moveCamera,
}

export function Navigator({
  camera,
  moveCamera,
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
  }, [camera, spritesheet, zoom])

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
    console.log(camera.x)
    Object.entries(spritesheet).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        pset(x as any, y as any, pixel)
      })
    })

    ctx.current.strokeStyle = "#01ffff"
    ctx.current.lineWidth = 4
    ctx.current.rect(
      camera.x,
      camera.y,
      camera.x + camera.width,
      camera.y + camera.height
    )
    ctx.current.stroke()
  }, [camera, scale, spritesheet, zoom])

  const onTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor((event.touches[0].clientX - rect.left) / scale)
      const y = Math.floor((event.touches[0].clientY - rect.top) / scale)
      moveCamera(x, y)
    },
    []
  )

  const onTouchMove = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor((event.touches[0].clientX - rect.left) / scale)
      const y = Math.floor((event.touches[0].clientY - rect.top) / scale)
      moveCamera(x, y)
    },
    []
  )

  const props: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onTouchStart,
    onTouchMove,
  }

  return <canvas {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)
