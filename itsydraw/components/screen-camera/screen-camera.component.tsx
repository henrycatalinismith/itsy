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
import styles from "./screen-camera.module.scss"

interface ScreenCameraProps {
  camera: Rect
  spritesheet: string
  panCamera: (x: number, y: number) => void
}

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  spritesheet: selectSpritesheetPng(state),
})

const mapDispatchToProps = {
  panCamera,
}

export function ScreenCamera({
  camera,
  spritesheet,
  panCamera,
}: ScreenCameraProps): React.ReactElement {
  const rect = React.useRef<Rect>({
    x: camera.x,
    y: camera.y,
    width: camera.width,
    height: camera.height,
  })
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const image = React.useRef<HTMLImageElement>()

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
    ctx.current.strokeStyle = "#01ffff"
    ctx.current.lineWidth = 1
    ctx.current.beginPath()
    ctx.current.rect(
      rect.current.x,
      rect.current.y,
      rect.current.width - 1,
      rect.current.height - 1
    )
    ctx.current.stroke()
  }

  const onLoad = React.useCallback(() => {
    canvas.current.width = 128
    canvas.current.height = 128
    ctx.current = canvas.current.getContext("2d")
    image.current = new Image()
    image.current.onload = () => {
      ctx.current.drawImage(image.current, 0, 0)
      drawCamera()
    }
  }, [image.current])

  const onUpdateCamera = () => {
    console.log("UPDATE!!")
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

  const onTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      let { x, y } = touchLocation(event)
      x = _.clamp(x - camera.width / 2, 0, 127 - camera.width)
      y = _.clamp(y - camera.height / 2, 0, 127 - camera.height)

      rect.current.x = x
      rect.current.y = y
      drawCamera()
      update()
    },
    [scale, camera, rect]
  )

  const onTouchMove = onTouchStart

  React.useEffect(onLoad, [])
  React.useEffect(onUpdateCamera, [camera])
  React.useEffect(onUpdateSpritesheet, [spritesheet])

  const canvasProps: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onTouchStart,
    onTouchMove,
  }

  return (
    <div className={styles.component}>
      <canvas {...canvasProps} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenCamera)