import {
  selectCamera,
  selectZoom,
} from "@highvalley.systems/itsydraw/store/camera"
import { selectColor } from "@highvalley.systems/itsydraw/store/color"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import {
  selectSpritesheet,
  updateSpritesheet,
} from "@highvalley.systems/itsydraw/store/spritesheet"
import {
  Palette,
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
import styles from "./spritesheet.module.scss"

interface SpritesheetProps {
  camera: Rect
  color: PaletteIndex
  palette: Palette
  spritesheet: SpritesheetState
  updateSpritesheet: (changes: PartialSpritesheet) => void
  zoom: number
}

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  color: selectColor(state),
  palette: selectPalette(state),
  spritesheet: selectSpritesheet(state),
  zoom: selectZoom(state),
})

const mapDispatchToProps = {
  updateSpritesheet,
}

export function Spritesheet({
  camera,
  color,
  palette,
  spritesheet,
  updateSpritesheet,
  zoom,
}: SpritesheetProps): React.ReactElement {
  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()

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

  const update = _.debounce(() => {
    updateSpritesheet(changes.current)
    changes.current = {}
  }, 100)

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
    Object.entries(spritesheet).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        draw(x as any, y as any, pixel)
      })
    })
  }

  const sset = (
    x: SpritesheetPixelIndex,
    y: SpritesheetPixelIndex,
    i: PaletteIndex
  ) => {
    draw(x, y, i)
    if (!changes.current[x]) {
      changes.current[x] = {}
    }
    changes.current[x][y] = i
    update()
  }

  const line = (
    x0: SpritesheetPixelIndex,
    y0: SpritesheetPixelIndex,
    x1: SpritesheetPixelIndex,
    y1: SpritesheetPixelIndex,
    i: PaletteIndex
  ) => {
    const dx = Math.abs(x1 - x0),
      sx = x0 < x1 ? 1 : -1
    const dy = Math.abs(y1 - y0),
      sy = y0 < y1 ? 1 : -1
    let err = (dx > dy ? dx : -dy) / 2

    while (true) {
      sset(x0, y0, i)
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

  const onLoad = React.useCallback(() => {
    canvas.current.width = camera.width
    canvas.current.height = camera.height
    ctx.current = canvas.current.getContext("2d")
    repaint()
  }, [])

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

      if (x < 0 || x > 127 || y < 0 || y > 127) {
        return
      }

      if (x === last.current.x && y === last.current.y) {
        return
      }

      sset(x, y, color)
      last.current = { x, y }
    },
    [camera, color]
  )

  const onTouchMove = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const { x, y } = touchLocation(event)

      if (x < 0 || x > 127 || y < 0 || y > 127) {
        return
      }

      if (x === last.current.x && y === last.current.y) {
        return
      }

      console.log(x, y)
      if (last.current.x === undefined) {
        sset(x, y, color)
      } else {
        line(last.current.x, last.current.y, x, y, color)
      }

      last.current = { x, y }
    },
    [camera, color]
  )

  const onUpdateCamera = React.useCallback(() => {
    canvas.current.width = camera.width
    canvas.current.height = camera.height
    repaint()
  }, [camera])

  React.useEffect(onLoad, [])
  React.useEffect(onUpdateCamera, [camera])

  const props: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onTouchStart,
    onTouchMove,
  }

  return <canvas {...props} />
  /*
  const repainting = React.useRef(false)
  const changes = React.useRef<
    {
      [i in SpritesheetPixelIndex]?: {
        [i in SpritesheetPixelIndex]?: PaletteIndex
      }
    }
  >({})

  const update = _.debounce(() => {
    updateSpritesheet(changes.current)
    changes.current = {}
  }, 100)

  const canvas = React.useRef<HTMLCanvasElement>()
  const ctx = React.useRef<CanvasRenderingContext2D>()
  const drawing = React.useRef(false)
  const last = React.useRef<{
    x: SpritesheetPixelIndex
    y: SpritesheetPixelIndex
  }>({ x: undefined, y: undefined })
  const [scale, setScale] = React.useState(1)

  console.log(`<Spritesheet camera={${JSON.stringify(camera)}} scale={${scale}} zoom={${zoom}} />`)

  React.useEffect(() => {
    if (canvas.current) {
      canvas.current.width = canvas.current.clientWidth
      canvas.current.height = canvas.current.clientHeight
      ctx.current = canvas.current.getContext("2d")
      setScale((canvas.current.clientWidth / 128) * (128 / camera.width))
      repaint()
    }
  }, [camera, zoom])

  React.useEffect(() => {
    ctx.current.scale(scale, scale)
    repaint()
  }, [zoom, scale])

  const cls = React.useCallback(
    (i = 0) => {
      const color = palette[i].hex
      ctx.current.fillStyle = color
      ctx.current.fillRect(0, 0, 128, 128)
    },
    [scale]
  )

  const draw = React.useCallback(
    (x: SpritesheetPixelIndex, y: SpritesheetPixelIndex, i: PaletteIndex) => {
      const ix = parseInt(x.toString(), 10)
      const iy = parseInt(y.toString(), 10)

      if (ix < camera.x || ix > camera.x + camera.width) {
        // return
      }
      if (iy < camera.y || iy > camera.y + camera.height) {
        // return
      }

      const jx = ix // - camera.x
      const jy = iy // - camera.y

      const color = palette[i].hex
      ctx.current.strokeStyle = color
      ctx.current.fillStyle = color
      ctx.current.fillRect(jx, jy, 1, 1)
    },
    [camera]
  )

  const pset = React.useCallback(
    (x: SpritesheetPixelIndex, y: SpritesheetPixelIndex, i: PaletteIndex) => {
      draw(x, y, i)
      if (!repainting.current) {
        if (!changes.current[x]) {
          changes.current[x] = {}
        }
        changes.current[x][y] = i
        update()
      }
    },
    [camera, scale]
  )

  const line = React.useCallback(
    (
      x0: SpritesheetPixelIndex,
      y0: SpritesheetPixelIndex,
      x1: SpritesheetPixelIndex,
      y1: SpritesheetPixelIndex,
      i: PaletteIndex
    ) => {
      const dx = Math.abs(x1 - x0),
        sx = x0 < x1 ? 1 : -1
      const dy = Math.abs(y1 - y0),
        sy = y0 < y1 ? 1 : -1
      let err = (dx > dy ? dx : -dy) / 2

      while (true) {
        pset(x0, y0, i)
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
    },
    [scale]
  )

  const repaint = React.useCallback(() => {
    cls(0)
    repainting.current = true
    Object.entries(spritesheet).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        draw(x as any, y as any, pixel)
      })
    })
    repainting.current = false
  }, [scale])

  const onTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor(
        (event.touches[0].clientX - rect.left) / scale
      ) as SpritesheetPixelIndex
      const y = Math.floor(
        (event.touches[0].clientY - rect.top) / scale
      ) as SpritesheetPixelIndex

      if (x < 0 || x > 127 || y < 0 || y > 127) {
        return
      }

      if (x === last.current.x && y === last.current.y) {
        return
      }

      drawing.current = true

      pset(x, y, color)
      last.current = { x, y }
    },
    [scale, color]
  )

  const onTouchMove = React.useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvas.current.getBoundingClientRect()
      const x = Math.floor(
        (event.touches[0].clientX - rect.left) / scale
      ) as SpritesheetPixelIndex
      const y = Math.floor(
        (event.touches[0].clientY - rect.top) / scale
      ) as SpritesheetPixelIndex

      if (x < 0 || x > 127 || y < 0 || y > 127) {
        return
      }

      if (x === last.current.x && y === last.current.y) {
        return
      }

      drawing.current = true

      if (last.current.x === undefined) {
        pset(x, y, color)
      } else {
        line(last.current.x, last.current.y, x, y, color)
      }

      last.current = { x, y }
    },
    [scale, color]
  )

  const props: React.HTMLProps<HTMLCanvasElement> = {
    className: cx(styles.canvas),
    ref: canvas,
    onTouchStart,
    onTouchMove,
  }

  return <canvas {...props} />
  */
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
