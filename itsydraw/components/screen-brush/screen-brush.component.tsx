import {
  BrushSizes,
  BrushTypes,
  selectBrushColor,
  selectBrushSize,
  selectBrushType,
  selectCamera,
  selectPalette,
} from "@highvalley.systems/itsydraw/store/tools"
import {
  selectSpritesheetPng,
  updateSpritesheet,
} from "@highvalley.systems/itsydraw/store/spritesheet"
import {
  selectWebview,
  WebviewState,
} from "@highvalley.systems/itsydraw/store/webview"
import {
  Palette,
  PaletteColor,
  PaletteIndex,
  PartialSpritesheet,
  Point,
  Rect,
  Spritesheet as SpritesheetState,
  SpritesheetPixelIndex,
} from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import styles from "./screen-brush.module.scss"

interface ScreenBrushProps {
  camera: Rect
  brushColor: PaletteColor
  brushSize: BrushSizes
  brushType: BrushTypes
  color: PaletteIndex
  palette: Palette
  spritesheetPixels: SpritesheetState
  spritesheetPng: string
  updateSpritesheet: (changes: PartialSpritesheet) => void
  webview: WebviewState
}

const mapStateToProps = (state) => ({
  brushColor: selectBrushColor(state),
  brushSize: selectBrushSize(state),
  brushType: selectBrushType(state),
  camera: selectCamera(state),
  palette: selectPalette(state),
  spritesheetPng: selectSpritesheetPng(state),
  webview: selectWebview(state),
})

const mapDispatchToProps = {
  updateSpritesheet,
}

export function ScreenBrush({
  brushColor,
  brushSize,
  brushType,
  camera,
  palette,
  spritesheetPixels,
  spritesheetPng,
  updateSpritesheet,
  webview,
}: ScreenBrushProps): React.ReactElement {
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const image = React.useRef<HTMLImageElement>()

  const last = React.useRef<{
    x: SpritesheetPixelIndex
    y: SpritesheetPixelIndex
  }>({ x: undefined, y: undefined })

  const changes = React.useRef<
    {
      [i in SpritesheetPixelIndex]?: {
        [i in SpritesheetPixelIndex]?: PaletteIndex
      }
    }
  >({})

  const previewChanges = React.useRef<
    {
      [i in SpritesheetPixelIndex]?: {
        [i in SpritesheetPixelIndex]?: PaletteIndex
      }
    }
  >({})

  const lineOrigin = React.useRef<{
    x: SpritesheetPixelIndex
    y: SpritesheetPixelIndex
  }>({ x: 0, y: 0 })

  const circleOrigin = React.useRef<{
    x: SpritesheetPixelIndex
    y: SpritesheetPixelIndex
  }>({ x: 0, y: 0 })

  const update = _.debounce(() => {
    updateSpritesheet(changes.current)
    changes.current = {}
  }, 100)

  const clearPreview = () => {
    previewChanges.current = {}
  }

  const flushPreview = () => {
    _.merge(changes.current, previewChanges.current)
    clearPreview()
  }

  const cls = (i = 0) => {
    ctx.current.fillStyle = palette[i].hex
    ctx.current.fillRect(0, 0, 128, 128)
    ctx.current.scale(1, 1)
  }

  const draw = (
    x: SpritesheetPixelIndex,
    y: SpritesheetPixelIndex,
    i: PaletteIndex
  ) => {
    const ix = parseInt(x.toString(), 10)
    const iy = parseInt(y.toString(), 10)

    if (ix < camera.x || ix > camera.x + camera.width) {
      return
    }
    if (iy < camera.y || iy > camera.y + camera.height) {
      return
    }

    const jx = ix - camera.x
    const jy = iy - camera.y

    const color = palette[i].hex
    ctx.current.strokeStyle = color
    ctx.current.fillStyle = color
    ctx.current.fillRect(jx, jy, 1, 1)
  }

  const repaint = () => {
    cls(0)
    image.current.onload = () => {
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
    }
    image.current.src = `data:image/png;base64,${spritesheetPng}`
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
  }

  const sset = (
    x: SpritesheetPixelIndex,
    y: SpritesheetPixelIndex,
    i: PaletteIndex,
    preview = false
  ) => {
    const target = preview ? previewChanges : changes
    for (let sx = x; sx < x + brushSize && sx < 127; sx++) {
      for (let sy = y; sy < y + brushSize && sy < 127; sy++) {
        draw(sx, sy, i)
        if (!target.current[sx]) {
          target.current[sx] = {}
        }
        target.current[sx][sy] = i
      }
    }

    update()
  }

  const line = (
    x0: SpritesheetPixelIndex,
    y0: SpritesheetPixelIndex,
    x1: SpritesheetPixelIndex,
    y1: SpritesheetPixelIndex,
    i: PaletteIndex,
    preview = false
  ) => {
    const dx = Math.abs(x1 - x0),
      sx = x0 < x1 ? 1 : -1
    const dy = Math.abs(y1 - y0),
      sy = y0 < y1 ? 1 : -1
    let err = (dx > dy ? dx : -dy) / 2

    while (true) {
      sset(x0, y0, i, preview)
      if (x0 === x1 && y0 === y1) break
      var e2 = err
      if (e2 > -dx) {
        err -= dy
        x0 += sx
      }
      if (e2 < dy) {
        err += dx
        y0 += sy
      }
    }
  }

  const circ = (
    cx: SpritesheetPixelIndex,
    cy: SpritesheetPixelIndex,
    r: number,
    i: PaletteIndex,
    preview = false
  ) => {
    let x = r as SpritesheetPixelIndex
    let y = 0 as SpritesheetPixelIndex
    let radiusError = 1 - x
    while (x >= y) {
      sset((+x + cx) as any, (+y + cy) as any, i, preview)
      sset((+y + cx) as any, (+x + cy) as any, i, preview)
      sset((-x + cx) as any, (+y + cy) as any, i, preview)
      sset((-y + cx) as any, (+x + cy) as any, i, preview)
      sset((-x + cx) as any, (-y + cy) as any, i, preview)
      sset((-y + cx) as any, (-x + cy) as any, i, preview)
      sset((+x + cx) as any, (-y + cy) as any, i, preview)
      sset((+y + cx) as any, (-x + cy) as any, i, preview)
      y++

      if (radiusError < 0) {
        radiusError += 2 * y + 1
      } else {
        x--
        radiusError += 2 * (y - x + 1)
      }
    }
  }

  const onLoad = React.useCallback(() => {
    canvas.current.width = camera.width
    canvas.current.height = camera.height
    ctx.current = canvas.current.getContext("2d")
    image.current = new Image()
    repaint()
  }, [])

  const onImport = React.useCallback(() => {
    repaint()
  }, [spritesheetPng, palette])

  const touchLocation = (
    event: React.TouchEvent<HTMLCanvasElement>
  ): {
    x: SpritesheetPixelIndex
    y: SpritesheetPixelIndex
  } => {
    const rect = canvas.current.getBoundingClientRect()
    const x = (camera.x +
      Math.floor(
        (camera.width / rect.width) * (event.touches[0].clientX - rect.left)
      )) as SpritesheetPixelIndex
    const y = (camera.y +
      Math.floor(
        (camera.height / rect.height) * (event.touches[0].clientY - rect.top)
      )) as SpritesheetPixelIndex
    return { x, y }
  }

  const onTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const { x, y } = touchLocation(event)
      const outOfBounds = x < 0 || x > 127 || y < 0 || y > 127

      switch (brushType) {
        case BrushTypes.Pencil:
          if (outOfBounds || (x === last.current.x && y === last.current.y)) {
            return
          }

          sset(x, y, brushColor.id)
          break

        case BrushTypes.Line:
          if (outOfBounds) return
          sset(x, y, brushColor.id, true)
          lineOrigin.current.x = x
          lineOrigin.current.y = y
          break

        case BrushTypes.Circle:
          if (outOfBounds) return
          sset(x, y, brushColor.id, true)
          circleOrigin.current.x = x
          circleOrigin.current.y = y
          break
      }
      last.current = { x, y }
    },
    [camera, brushColor.hex, brushSize, brushType]
  )

  const onTouchMove = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const { x, y } = touchLocation(event)
      const outOfBounds = x < 0 || x > 127 || y < 0 || y > 127

      switch (brushType) {
        case BrushTypes.Pencil:
          if (outOfBounds || (x === last.current.x && y === last.current.y)) {
            return
          }
          if (last.current.x === undefined) {
            sset(x, y, brushColor.id)
          } else {
            line(last.current.x, last.current.y, x, y, brushColor.id)
          }
          last.current = { x, y }
          break

        case BrushTypes.Line:
          clearPreview()
          redraw()
          line(
            lineOrigin.current.x,
            lineOrigin.current.y,
            x,
            y,
            brushColor.id,
            true
          )
          break

        case BrushTypes.Circle:
          clearPreview()
          redraw()
          const r = Math.round(
            Math.sqrt(
              Math.pow(circleOrigin.current.x - x, 2) +
                Math.pow(circleOrigin.current.y - y, 2)
            )
          )
          circ(
            circleOrigin.current.x,
            circleOrigin.current.y,
            r,
            brushColor.id,
            true
          )
          break
      }
    },
    [camera, brushColor.hex, brushSize, brushType]
  )

  const onTouchEnd = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      switch (brushType) {
        case BrushTypes.Line:
          flushPreview()
          update()
          break

        case BrushTypes.Circle:
          flushPreview()
          update()
          break
      }
    },
    [brushSize, brushType]
  )

  const onUpdateCamera = React.useCallback(() => {
    canvas.current.width = camera.width
    canvas.current.height = camera.height
    repaint()
  }, [camera])

  React.useEffect(onLoad, [])
  React.useEffect(onImport, [webview.imported])
  React.useEffect(onUpdateCamera, [camera])

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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenBrush)
