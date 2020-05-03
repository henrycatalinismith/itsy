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
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const image = React.useRef<HTMLImageElement>()
  const { rect } = React.useContext(ScreenContext)

  const scale = rect.width / 128

  const drawCamera = () => {
    ctx.current.strokeStyle = "#01ffff"
    ctx.current.lineWidth = 1
    ctx.current.beginPath()
    ctx.current.rect(camera.x, camera.y, camera.width, camera.height)
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

      panCamera(tx, ty)
    },
    [scale, camera]
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
