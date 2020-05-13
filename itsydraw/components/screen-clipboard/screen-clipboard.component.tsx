import {
  selectCamera,
  selectClipboardRect,
  setClipboard,
} from "@highvalley.systems/itsydraw/store/tools"
import { selectSpritesheetPng } from "@highvalley.systems/itsydraw/store/spritesheet"
import { Point, Rect } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import ScreenContext from "../screen/screen.context"
import styles from "./screen-clipboard.module.scss"

interface ScreenClipboardProps {
  camera: Rect
  clipboard: Rect
  spritesheet: string
  setClipboard: (rect: Rect) => void
}

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  clipboard: selectClipboardRect(state),
  spritesheet: selectSpritesheetPng(state),
})

const mapDispatchToProps = {
  setClipboard,
}

export function ScreenClipboard({
  camera,
  clipboard,
  spritesheet,
  setClipboard,
}: ScreenClipboardProps): React.ReactElement {
  const origin = React.useRef<Point>({
    x: 0,
    y: 0,
  })
  const rect = React.useRef<Rect>({
    x: clipboard.x,
    y: clipboard.y,
    width: clipboard.width,
    height: clipboard.height,
  })

  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const image = React.useRef<HTMLImageElement>()

  const screen = React.useContext(ScreenContext)
  const scale = screen.rect.width / 128

  const update = _.debounce(() => {
    setClipboard({ ...rect.current })
  }, 100)

  const repaint = () => {
    image.current.onload = () => redraw()
    image.current.src = `data:image/png;base64,${spritesheet}`
  }

  const redraw = () => {
    ctx.current.drawImage(
      image.current,
      camera.x,
      camera.y,
      camera.width,
      camera.height,
      0,
      0,
      canvas.current.width,
      canvas.current.height
    )

    ctx.current.strokeStyle = "#01ffff"
    ctx.current.lineWidth = 1
    ctx.current.beginPath()
    ctx.current.rect(
      rect.current.x,
      rect.current.y,
      rect.current.width,
      rect.current.height
    )
    ctx.current.stroke()
  }

  const onLoad = React.useCallback(() => {
    canvas.current.width = camera.width
    canvas.current.height = camera.height
    ctx.current = canvas.current.getContext("2d")
    image.current = new Image()
    repaint()
  }, [image.current])

  const onUpdateCamera = () => {
    canvas.current.width = camera.width
    canvas.current.height = camera.height
    repaint()
  }

  const onUpdateClipboard = () => {
    // rect.current.x = clipboard.x
    // rect.current.y = clipboard.y
    // rect.current.width = clipboard.width
    // rect.current.height = clipboard.height
    redraw()
  }

  const onUpdateSpritesheet = () => {
    repaint()
  }

  const onTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const r = canvas.current.getBoundingClientRect()

      const cx = event.touches[0].clientX - r.left
      const cy = event.touches[0].clientY - r.top

      const sx = _.clamp(Math.floor((1 / scale) * cx), 0, 127)
      const sy = _.clamp(Math.floor((1 / scale) * cy), 0, 127)

      const tx = camera.x + Math.round((camera.width / 128) * sx)
      const ty = camera.y + Math.round((camera.height / 128) * sy)

      console.log(rect)
      rect.current.x = tx
      rect.current.y = ty
      origin.current.x = tx
      origin.current.y = ty
      repaint()
    },
    [camera, rect, scale]
  )

  const onTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const r = canvas.current.getBoundingClientRect()

    const cx = event.touches[0].clientX - r.left
    const cy = event.touches[0].clientY - r.top

    const sx = _.clamp(Math.floor((1 / scale) * cx), 0, 127)
    const sy = _.clamp(Math.floor((1 / scale) * cy), 0, 127)

    const tx = camera.x + Math.round((camera.width / 128) * sx)
    const ty = camera.y + Math.round((camera.height / 128) * sy)

    if (origin.current.x < tx) {
      rect.current.width = tx - rect.current.x
    } else {
      rect.current.x = tx
      rect.current.width = origin.current.x - tx
    }

    if (origin.current.y < ty) {
      rect.current.height = ty - rect.current.y
    } else {
      rect.current.y = ty
      rect.current.height = origin.current.y - ty
    }

    repaint()
  }

  const onTouchEnd = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      update()
    },
    []
  )

  React.useEffect(onLoad, [])
  React.useEffect(onUpdateCamera, [camera])
  React.useEffect(onUpdateClipboard, [clipboard])
  React.useEffect(onUpdateSpritesheet, [spritesheet])

  const canvasProps: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }

  return (
    <div className={styles.component}>
      <canvas {...canvasProps} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenClipboard)
