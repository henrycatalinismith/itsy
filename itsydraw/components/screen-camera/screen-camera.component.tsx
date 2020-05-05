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
      rect.current.width,
      rect.current.height
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
      const r = canvas.current.getBoundingClientRect()

      const cx = event.touches[0].clientX - r.left
      const cy = event.touches[0].clientY - r.top

      const sx = _.clamp(Math.floor((1 / scale) * cx), 0, 127)
      const sy = _.clamp(Math.floor((1 / scale) * cy), 0, 127)

      const tx = _.clamp(sx - camera.width / 2, 0, 127 - camera.width)
      const ty = _.clamp(sy - camera.width / 2, 0, 127 - camera.width)

      rect.current.x = tx
      rect.current.y = ty
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
