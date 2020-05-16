import useTouchLocation from "@highvalley.systems/itsydraw/hooks/useTouchLocation"
import {
  selectCamera,
  selectClipboardRect,
  selectClipboardStatus,
  setClipboard,
  ToolStatuses,
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
  status: ToolStatuses
}

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  clipboard: selectClipboardRect(state),
  spritesheet: selectSpritesheetPng(state),
  status: selectClipboardStatus(state),
})

const mapDispatchToProps = {
  setClipboard,
}

export function ScreenClipboard({
  camera,
  clipboard,
  spritesheet,
  setClipboard,
  status,
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
  const active = React.useRef(false)

  const screen = React.useContext(ScreenContext)
  const scale = screen.rect.width / 128

  const touchLocation = useTouchLocation(canvas.current, camera)

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
      rect.current.x - camera.x,
      rect.current.y - camera.y,
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

  const beginSelection = (
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { x, y } = touchLocation(event)
    active.current = true
    rect.current.x = x
    rect.current.y = y
    origin.current.x = x
    origin.current.y = y
    redraw()
  }

  const updateSelection = (
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { x, y } = touchLocation(event)
    if (active.current === false) {
      return
    }

    if (origin.current.x < x) {
      rect.current.width = x - rect.current.x
    } else {
      rect.current.x = x
      rect.current.width = origin.current.x - x
    }

    if (origin.current.y < y) {
      rect.current.height = y - rect.current.y
    } else {
      rect.current.y = y
      rect.current.height = origin.current.y - y
    }

    redraw()
  }

  const finishSelection = (): void => {
    active.current = false
    update()
  }

  const onMouseDown = React.useCallback(beginSelection, [camera, rect, scale])
  const onMouseMove = React.useCallback(updateSelection, [camera, rect, scale])
  const onMouseUp = React.useCallback(finishSelection, [])

  const onTouchStart = React.useCallback(beginSelection, [camera, rect, scale])
  const onTouchMove = React.useCallback(updateSelection, [camera, rect, scale])
  const onTouchEnd = React.useCallback(finishSelection, [])

  React.useEffect(onLoad, [])
  React.useEffect(onUpdateCamera, [camera])
  React.useEffect(onUpdateClipboard, [clipboard])
  React.useEffect(onUpdateSpritesheet, [spritesheet])
  React.useEffect(() => {
    if (status === ToolStatuses.Active) {
      redraw()
    }
  }, [status])

  const canvasProps: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onMouseDown,
    onMouseMove,
    onMouseUp,
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
