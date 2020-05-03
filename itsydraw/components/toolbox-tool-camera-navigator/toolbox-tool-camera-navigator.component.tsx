import ToolboxToolContext from "@highvalley.systems/itsydraw/components/toolbox-tool/toolbox-tool.context"
import {
  panCamera,
  selectCamera,
  selectPalette,
  selectZoom,
} from "@highvalley.systems/itsydraw/store/tools"
import { selectSpritesheetPixels } from "@highvalley.systems/itsydraw/store/spritesheet"
import {
  Palette,
  PaletteIndex,
  Rect,
  Spritesheet,
  SpritesheetPixelIndex,
} from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-camera-navigator.module.scss"

interface ToolboxToolCameraNavigatorProps {
  camera: Rect
  panCamera: (x: number, y: number) => void
  palette: Palette
  spritesheetPixels: Spritesheet
  zoom: number
}

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  palette: selectPalette(state),
  spritesheetPixels: selectSpritesheetPixels(state),
  zoom: selectZoom(state),
})

const mapDispatchToProps = {
  panCamera,
}

export function ToolboxToolCameraNavigator({
  camera,
  panCamera,
  palette,
  spritesheetPixels,
  zoom,
}: ToolboxToolCameraNavigatorProps): React.ReactElement {
  const { rect } = React.useContext(ToolboxToolContext)
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()

  const min = Math.min(rect.width, rect.height)
  const scale = min / 128

  const cls = (i = 0) => {
    const color = palette[i].hex
    ctx.current.fillStyle = color
    ctx.current.fillRect(0, 0, 128, 128)
  }

  const pset = (
    x: SpritesheetPixelIndex,
    y: SpritesheetPixelIndex,
    i: PaletteIndex
  ) => {
    const color = palette[i].hex
    ctx.current.strokeStyle = color
    ctx.current.fillStyle = color
    ctx.current.fillRect(
      parseInt(x.toString(), 10),
      parseInt(y.toString(), 10),
      1,
      1
    )
  }

  const repaint = () => {
    cls(0)
    console.log("repainting")
    console.log(camera.x)
    Object.entries(spritesheetPixels).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        pset(x as any, y as any, pixel)
      })
    })

    ctx.current.strokeStyle = "#01ffff"
    ctx.current.lineWidth = 1
    ctx.current.beginPath()
    ctx.current.rect(camera.x, camera.y, camera.width, camera.height)
    ctx.current.stroke()
  }

  const onLoad = React.useCallback(() => {
    canvas.current.width = min
    canvas.current.height = min
    ctx.current = canvas.current.getContext("2d")
  }, [])

  const onResize = React.useCallback(() => {
    ctx.current.scale(scale, scale)
  }, [scale])

  const onUpdateSpritesheet = React.useCallback(() => {
    repaint()
  }, [spritesheetPixels])

  const onUpdateCamera = React.useCallback(() => {
    repaint()
  }, [camera])

  const onTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor((event.touches[0].clientX - rect.left) / 1)
      const y = Math.floor((event.touches[0].clientY - rect.top) / 1)
      panCamera(x, y)
    },
    []
  )

  const onTouchMove = onTouchStart

  React.useEffect(onLoad, [])
  React.useEffect(onResize, [scale])
  React.useEffect(onUpdateSpritesheet, [spritesheetPixels])
  React.useEffect(onUpdateCamera, [camera])

  const props: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onTouchStart,
    onTouchMove,
    width: !isNaN(min) ? min : 0,
    height: !isNaN(min) ? min : 0,
  }

  return <canvas {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolCameraNavigator)
