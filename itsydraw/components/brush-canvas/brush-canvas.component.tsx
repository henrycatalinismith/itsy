import useTouchLocation from "@highvalley.systems/itsydraw/hooks/useTouchLocation"
import {
  BrushSizes,
  BrushModes,
  LineAngles,
  CircleStyles,
  ToolStatuses,
  selectBrushColor,
  selectBrushSize,
  selectBrushStatus,
  selectActiveBrushMode,
  selectLineBrushAngle,
  selectCircleBrushStyle,
  selectCamera,
  selectPalette,
  selectClipboardRect,
} from "@highvalley.systems/itsydraw/store/tools"
import spritesheet, {
  selectSpritesheetPixels,
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
import styles from "./brush-canvas.module.scss"

type PointerInputEvent =
  | React.TouchEvent<HTMLCanvasElement>
  | React.MouseEvent<HTMLCanvasElement>

interface BrushInputHandler {
  start(event: PointerInputEvent): void
  move(event: PointerInputEvent): void
  end(event: PointerInputEvent): void
}

type BrushModeInputHandlers = {
  [key in BrushModes]: BrushInputHandler
}

interface BrushCanvasProps {
  camera: Rect
  brushColor: PaletteColor
  brushSize: BrushSizes
  brushMode: BrushModes
  brushStatus: ToolStatuses
  circleStyle: CircleStyles
  lineAngle: LineAngles
  color: PaletteIndex
  palette: Palette
  spritesheetPixels: SpritesheetState
  spritesheetPng: string
  updateSpritesheet: (changes: PartialSpritesheet) => void
  webview: WebviewState
  clipboardRect: Rect
}

const mapStateToProps = (state) => ({
  brushColor: selectBrushColor(state),
  brushSize: selectBrushSize(state),
  brushMode: selectActiveBrushMode(state),
  brushStatus: selectBrushStatus(state),
  circleStyle: selectCircleBrushStyle(state),
  lineAngle: selectLineBrushAngle(state),
  camera: selectCamera(state),
  palette: selectPalette(state),
  spritesheetPixels: selectSpritesheetPixels(state),
  spritesheetPng: selectSpritesheetPng(state),
  webview: selectWebview(state),
  clipboardRect: selectClipboardRect(state),
})

const mapDispatchToProps = {
  updateSpritesheet,
}

export function BrushCanvas({
  brushColor,
  brushMode,
  brushSize,
  circleStyle,
  clipboardRect,
  brushStatus,
  lineAngle,
  camera,
  palette,
  spritesheetPixels,
  spritesheetPng,
  updateSpritesheet,
  webview,
}: BrushCanvasProps): React.ReactElement {
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const image = React.useRef<HTMLImageElement>()

  const last = React.useRef<{
    x: number
    y: number
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
    x: number
    y: number
  }>({ x: 0, y: 0 })

  const circleOrigin = React.useRef<{
    x: number
    y: number
  }>({ x: 0, y: 0 })

  const outOfBounds = (x: number, y: number): boolean => {
    return (
      x < camera.x ||
      y < camera.y ||
      x > camera.x + camera.width ||
      y > camera.y + camera.height
    )
  }

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

  const draw = (x: number, y: number, i: PaletteIndex) => {
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
    image.current.onload = () => redraw()
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

  const sget = (x: number, y: number, preview = false) => {
    return preview
      ? previewChanges[x]
        ? previewChanges[x][y]
        : spritesheetPixels[x][y]
      : spritesheetPixels[x][y]
  }

  const sset = (x: number, y: number, i: PaletteIndex, preview = false) => {
    const target = preview ? previewChanges : changes
    if (outOfBounds(x, y)) return
    for (let sx = x; sx < x + brushSize && sx < 127; sx++) {
      for (let sy = y; sy < y + brushSize && sy < 127; sy++) {
        if (outOfBounds(sx, sy)) continue
        draw(sx, sy, i)
        if (!target.current[sx]) {
          target.current[sx] = {}
        }
        target.current[sx][sy] = i
      }
    }

    // update()
  }

  const line = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
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
    cx: number,
    cy: number,
    r: number,
    i: PaletteIndex,
    preview = false
  ) => {
    let x = r
    let y = 0
    let radiusError = 1 - x
    while (x >= y) {
      sset(+x + cx, +y + cy, i, preview)
      sset(+y + cx, +x + cy, i, preview)
      sset(-x + cx, +y + cy, i, preview)
      sset(-y + cx, +x + cy, i, preview)
      sset(-x + cx, -y + cy, i, preview)
      sset(-y + cx, -x + cy, i, preview)
      sset(+x + cx, -y + cy, i, preview)
      sset(+y + cx, -x + cy, i, preview)
      y++

      if (radiusError < 0) {
        radiusError += 2 * y + 1
      } else {
        x--
        radiusError += 2 * (y - x + 1)
      }
    }
  }

  const circfill = (
    x: number,
    y: number,
    r: number,
    i: PaletteIndex,
    preview = false
  ) => {
    let f = 1 - r
    let ddF_x = 0
    let ddF_y = -2 * r
    let cx = 0
    let cy = r

    sset(x, y + r, i, preview)
    sset(x, y - r, i, preview)
    line(x + r, y, x - r, y, i, preview)

    while (cx < cy) {
      if (f >= 0) {
        cy--
        ddF_y += 2
        f += ddF_y
      }

      cx++
      ddF_x += 2
      f += ddF_x + 1

      line(x + cx, y + cy, x - cx, y + cy, i, preview)
      line(x + cx, y - cy, x - cx, y - cy, i, preview)
      line(x + cy, y + cx, x - cy, y + cx, i, preview)
      line(x + cy, y - cx, x - cy, y - cx, i, preview)
    }
  }

  const onLoad = React.useCallback(() => {
    canvas.current.width = camera.width
    canvas.current.height = camera.height
    ctx.current = canvas.current.getContext("2d")
    image.current = new Image()
    repaint()
  }, [spritesheetPng])

  const onImport = React.useCallback(() => {
    repaint()
  }, [spritesheetPng, palette])

  const touchLocation = useTouchLocation(canvas.current, camera)

  const inputActive = React.useRef(false)
  const input: BrushModeInputHandlers = {
    [BrushModes.Pencil]: {
      start(event: PointerInputEvent) {
        const { x, y } = touchLocation(event)
        inputActive.current = true
        if (
          outOfBounds(x, y) ||
          (x === last.current.x && y === last.current.y)
        ) {
          return
        }

        sset(x, y, brushColor.id)
      },

      move(event: PointerInputEvent) {
        if (!inputActive.current) return
        const { x, y } = touchLocation(event)
        if (
          outOfBounds(x, y) ||
          (x === last.current.x && y === last.current.y)
        ) {
          return
        }
        if (last.current.x === undefined) {
          sset(x, y, brushColor.id)
        } else {
          line(last.current.x, last.current.y, x, y, brushColor.id)
        }
        last.current = { x, y }
      },

      end(event: PointerInputEvent) {
        inputActive.current = false
        last.current.x = undefined
        last.current.y = undefined
        update()
      },
    },

    [BrushModes.Line]: {
      start(event: PointerInputEvent) {
        const { x, y } = touchLocation(event)
        inputActive.current = true
        if (outOfBounds(x, y)) return
        sset(x, y, brushColor.id, true)
        lineOrigin.current.x = x
        lineOrigin.current.y = y
      },

      move(event: PointerInputEvent) {
        if (!inputActive.current) return
        const { x, y } = touchLocation(event)
        const lx1 = lineOrigin.current.x
        const ly1 = lineOrigin.current.y
        let lx2 = x
        let ly2 = y

        if (lineAngle === LineAngles.Snap) {
          const lxd = Math.abs(lx1 - lx2)
          const lyd = Math.abs(ly1 - ly2)
          if (lxd > lyd) {
            ly2 = ly1
          } else {
            lx2 = lx1
          }
        }

        clearPreview()
        redraw()
        line(lx1, ly1, lx2, ly2, brushColor.id, true)
      },

      end(event: PointerInputEvent) {
        inputActive.current = false
        flushPreview()
        update()
      },
    },

    [BrushModes.Circle]: {
      start(event: PointerInputEvent) {
        const { x, y } = touchLocation(event)
        inputActive.current = true
        if (outOfBounds(x, y)) return
        sset(x, y, brushColor.id, true)
        circleOrigin.current.x = x
        circleOrigin.current.y = y
      },

      move(event: PointerInputEvent) {
        if (!inputActive.current) return
        const { x, y } = touchLocation(event)
        clearPreview()
        redraw()
        const r = Math.round(
          Math.sqrt(
            Math.pow(circleOrigin.current.x - x, 2) +
              Math.pow(circleOrigin.current.y - y, 2)
          )
        )
        const fn = circleStyle === CircleStyles.Fill ? circfill : circ
        console.log(circleStyle)
        fn(
          circleOrigin.current.x,
          circleOrigin.current.y,
          r,
          brushColor.id,
          true
        )
      },

      end(event: PointerInputEvent) {
        inputActive.current = false
        flushPreview()
        update()
      },
    },

    [BrushModes.Fill]: {
      start(event: PointerInputEvent) {
        const { x, y } = touchLocation(event)
        if (outOfBounds(x, y)) return

        const originColor = sget(x, y)
        fill(x, y, originColor, brushColor.id)
        flushPreview()
        update()
      },

      move(event: PointerInputEvent) {},

      end(event: PointerInputEvent) {},
    },

    [BrushModes.Paste]: {
      start(event: PointerInputEvent) {
        const { x, y } = touchLocation(event)
        for (let cx = clipboardRect.x; cx < clipboardRect.width; cx++) {
          for (let cy = clipboardRect.y; cy < clipboardRect.height; cy++) {
            draw(x + cx, y + cy, spritesheetPixels[cx][cy])
          }
        }
        inputActive.current = true
      },

      move(event: PointerInputEvent) {
        if (!inputActive.current) return
        const { x, y } = touchLocation(event)
        redraw()
        for (let cx = clipboardRect.x; cx < clipboardRect.width; cx++) {
          for (let cy = clipboardRect.y; cy < clipboardRect.height; cy++) {
            draw(x + cx, y + cy, spritesheetPixels[cx][cy])
          }
        }
        last.current = { x, y }
      },

      end(event: PointerInputEvent) {
        const { x, y } = last.current
        for (let cx = clipboardRect.x; cx < clipboardRect.width; cx++) {
          for (let cy = clipboardRect.y; cy < clipboardRect.height; cy++) {
            draw(x + cx, y + cy, spritesheetPixels[cx][cy])
            sset(x + cx, y + cy, spritesheetPixels[cx][cy], true)
          }
        }
        flushPreview()
        update()
        last.current.x = undefined
        last.current.y = undefined
        inputActive.current = false
      },
    },
  }

  const fill = (x: number, y: number, from: number, to: number, done = []) => {
    if (outOfBounds(x, y)) return
    if (sget(x, y) !== from) return
    if (sget(x, y, true) === to) return
    if (done.includes(`${x},${y}`)) return

    sset(x, y, to as PaletteIndex)
    done.push(`${x},${y}`)

    fill(x - 1, y - 1, from, to, done)
    fill(x - 1, y + 0, from, to, done)
    fill(x - 1, y + 1, from, to, done)
    fill(x + 0, y - 1, from, to, done)
    fill(x + 0, y + 1, from, to, done)
    fill(x + 1, y - 1, from, to, done)
    fill(x + 1, y + 0, from, to, done)
    fill(x + 1, y + 1, from, to, done)
  }

  const onUpdateCamera = React.useCallback(() => {
    canvas.current.width = camera.width
    canvas.current.height = camera.height
    repaint()
  }, [camera])

  const onUpdateSpritesheet = React.useCallback(() => {
    repaint()
  }, [camera, spritesheetPng])

  React.useEffect(onLoad, [])
  React.useEffect(onImport, [webview.imported])
  React.useEffect(onUpdateCamera, [camera])
  React.useEffect(onUpdateSpritesheet, [spritesheetPng])

  React.useEffect(() => {
    if (brushStatus === ToolStatuses.Active) {
      redraw()
    }
  }, [brushStatus])

  const onTouchStart = input[brushMode].start
  const onTouchMove = input[brushMode].move
  const onTouchEnd = input[brushMode].end

  const onMouseDown = onTouchStart
  const onMouseMove = onTouchMove
  const onMouseUp = onTouchEnd

  const canvasProps: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  }

  return (
    <div className={styles.component}>
      <canvas {...canvasProps} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BrushCanvas)
