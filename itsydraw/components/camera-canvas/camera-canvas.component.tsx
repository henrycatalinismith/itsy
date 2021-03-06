import useTouchLocation from "@highvalley.systems/itsydraw/hooks/useTouchLocation"
import {
  panCamera,
  selectCamera,
} from "@highvalley.systems/itsydraw/store/tools"
import { selectSpritesheetPng } from "@highvalley.systems/itsydraw/store/spritesheet"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import ScreenContext from "../screen/screen.context"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import styles from "./camera-canvas.module.scss"

interface CameraCanvasProps {
  camera: Rect
  spritesheet: string
  panCamera: (x: number, y: number) => void
}

type PointerInputEvent =
  | React.TouchEvent<HTMLCanvasElement>
  | React.MouseEvent<HTMLCanvasElement>

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  spritesheet: selectSpritesheetPng(state),
})

const mapDispatchToProps = {
  panCamera,
}

export function CameraCanvas({
  camera,
  spritesheet,
  panCamera,
}: CameraCanvasProps): React.ReactElement {
  const rect = React.useRef<Rect>({
    x: camera.x,
    y: camera.y,
    width: camera.width,
    height: camera.height,
  })
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const image = React.useRef<HTMLImageElement>()
  const pointerActive = React.useRef(false)

  const screen = React.useContext(ScreenContext)
  const scale = screen.rect.width / 128

  const touchLocation = useTouchLocation(canvas.current, {
    x: 0,
    y: 0,
    width: 128,
    height: 128,
  })

  const update = _.debounce(() => {
    panCamera(rect.current.x, rect.current.y)
  }, 100)

  const drawCamera = () => {
    ctx.current.drawImage(image.current, 0, 0)

    ctx.current.save()
    const cameraClip = new Path2D()
    cameraClip.rect(0, 0, 128, rect.current.y)
    cameraClip.rect(
      rect.current.x + rect.current.width,
      rect.current.y,
      127,
      127
    )
    cameraClip.rect(
      0,
      rect.current.y + rect.current.height,
      rect.current.x + rect.current.width,
      128
    )
    cameraClip.rect(
      0,
      rect.current.y,
      rect.current.x,
      rect.current.y + rect.current.height
    )
    ctx.current.clip(cameraClip)
    ctx.current.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.current.fillRect(0, 0, 128, 128)
    ctx.current.restore()

    ctx.current.save()
    ctx.current.scale(1, 1)
    ctx.current.strokeStyle = "#01ffff"
    ctx.current.lineWidth = 0.5
    ctx.current.strokeRect(
      rect.current.x,
      rect.current.y,
      rect.current.width,
      rect.current.height
    )
    ctx.current.restore()
  }

  const onLoad = React.useCallback(() => {
    canvas.current.width = 512
    canvas.current.height = 512
    ctx.current = canvas.current.getContext("2d")
    ctx.current.scale(4, 4)
    ctx.current.imageSmoothingEnabled = false
    image.current = new Image()
    image.current.onload = () => {
      ctx.current.drawImage(image.current, 0, 0)
      drawCamera()
    }
  }, [image.current])

  const onUpdateCamera = () => {
    rect.current.x = camera.x
    rect.current.y = camera.y
    rect.current.width = camera.width
    rect.current.height = camera.height
    ctx.current.drawImage(image.current, 0, 0)
    drawCamera()
  }

  const onUpdateSpritesheet = React.useCallback(() => {
    image.current.src = `data:image/png;base64,${spritesheet}`
  }, [spritesheet])

  const pointer = {
    start: React.useCallback(
      (event: PointerInputEvent) => {
        pointerActive.current = true
        let { x, y } = touchLocation(event)
        x = _.clamp(x - camera.width / 2, 0, 127 - camera.width)
        y = _.clamp(y - camera.height / 2, 0, 127 - camera.height)

        rect.current.x = x
        rect.current.y = y
        drawCamera()
        update()
      },
      [scale, camera, rect]
    ),

    move: React.useCallback(
      (event: PointerInputEvent) => {
        if (!pointerActive.current) return
        let { x, y } = touchLocation(event)
        x = _.clamp(x - camera.width / 2, 0, 127 - camera.width)
        y = _.clamp(y - camera.height / 2, 0, 127 - camera.height)

        rect.current.x = x
        rect.current.y = y
        drawCamera()
        update()
      },
      [scale, camera, rect]
    ),

    end: React.useCallback((event: PointerInputEvent) => {
      pointerActive.current = false
    }, []),
  }

  React.useEffect(onLoad, [])
  React.useEffect(onUpdateCamera, [camera])
  React.useEffect(onUpdateSpritesheet, [spritesheet])

  const canvasProps: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onMouseDown: pointer.start,
    onMouseMove: pointer.move,
    onMouseOut: pointer.end,
    onMouseUp: pointer.end,
    onTouchStart: pointer.start,
    onTouchMove: pointer.move,
    onTouchEnd: pointer.end,
  }

  return (
    <div className={styles.component}>
      <canvas {...canvasProps} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraCanvas)
