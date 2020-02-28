import { Thunk } from "@highvalley.systems/itsydraw/store"
import palette from "@highvalley.systems/itsydraw/store/palette"
import webview from "@highvalley.systems/itsydraw/store/webview"
import {
  Palette,
  PaletteIndex,
  Spritesheet,
  SpritesheetPixelIndex,
} from "@highvalley.systems/typedefs/itsy"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import didYouMean from "didyoumean2"
import _ from "lodash"

export type PartialSpritesheetState = {
  [i in SpritesheetPixelIndex]?: {
    [i in SpritesheetPixelIndex]?: PaletteIndex
  }
}

const name = "spritesheet"

const initialState: Spritesheet = _.zipObject(
  _.range(128),
  _.range(128).map(() => _.zipObject(_.range(128), _.fill(Array(128), 0)))
)

const reducers = {
  import(spritesheet, action: PayloadAction<Spritesheet>) {
    return action.payload
  },

  line(
    spritesheet,
    action: PayloadAction<{
      x0: SpritesheetPixelIndex
      y0: SpritesheetPixelIndex
      x1: SpritesheetPixelIndex
      y1: SpritesheetPixelIndex
      color: PaletteIndex
    }>
  ) {
    const { color } = action.payload
    let { x0, x1, y0, y1 } = action.payload
    const dx = Math.abs(x1 - x0)
    const dy = Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1
    const sy = y0 < y1 ? 1 : -1
    let err = (dx > dy ? dx : -dy) / 2

    while (true) {
      spritesheet[x0][y0] = color
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

  pset(
    spritesheet,
    action: PayloadAction<{
      x: SpritesheetPixelIndex
      y: SpritesheetPixelIndex
      color: PaletteIndex
    }>
  ) {
    spritesheet[action.payload.x][action.payload.y] = action.payload.color
  },

  update(spritesheet, action: PayloadAction<PartialSpritesheetState>) {
    _.forEach(action.payload, (column, x) => {
      _.forEach(column, (color, y) => {
        spritesheet[x][y] = color
      })
    })
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const selectSpritesheet = ({ spritesheet }) => spritesheet

// const hex = (red: number, blue: number, green: number) => ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1)

function hex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16)
  return "#" + (0x1000000 + rgb).toString(16).slice(1)
}

const png2hex = (
  base64: string,
  size: number,
  scale: number
): Promise<string[][]> => {
  return new Promise((resolve) => {
    const image = new Image()
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    canvas.width = size
    canvas.height = size

    image.onload = () => {
      context.scale(scale, scale)
      context.drawImage(image, 0, 0, size, size)
      const { data } = context.getImageData(0, 0, size, size)

      const grid = []
      for (let x = 0; x < size; x++) {
        grid[x] = []
        for (let y = 0; y < size; y++) {
          const index = (y * size + x) * 4
          const red = data[index]
          const green = data[index + 1]
          const blue = data[index + 2]
          grid[x][y] = hex(red, green, blue)
        }
      }

      resolve(grid)
    }
    image.src = `data:image/png;base64,${base64}`
    canvas.style.imageRendering = "pixelated"
  })
}

export const importSpritesheet = (
  spritesheetSource: string,
  paletteSource: string
): Thunk => async (dispatch) => {
  console.log("importing")
  const spritesheetPixels = await png2hex(spritesheetSource, 128, 1)
  const palettePixels = await png2hex(paletteSource, 4, 1)

  const paletteState: Palette = _.zipObject(
    _.range(16),
    _.range(16).map((id) => ({
      id,
      hex: palettePixels[id % 4][Math.floor(id / 4)],
    }))
  )

  const spritesheet = {}
  for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
      const spritePixel = spritesheetPixels[x][y]
      let paletteColor = _.find(paletteState, { hex: spritePixel })

      if (!paletteColor) {
        const closest = didYouMean(spritePixel, _.map(paletteState, "hex"))
        if (closest) {
          paletteColor = _.find(paletteState, { hex: closest })
        }
      }

      if (!paletteColor) {
        console.log(spritePixel)
        paletteColor = paletteState[0]
      }

      if (!spritesheet[x]) {
        spritesheet[x] = {}
      }

      spritesheet[x][y] = paletteColor.id
    }
  }

  dispatch(palette.actions.import(paletteState))
  dispatch(slice.actions.import(spritesheet as Spritesheet))
  dispatch(webview.actions.import())
}

export const drawLine = (
  x0: SpritesheetPixelIndex,
  y0: SpritesheetPixelIndex,
  x1: SpritesheetPixelIndex,
  y1: SpritesheetPixelIndex,
  color: PaletteIndex
): Thunk => async (dispatch) => {
  dispatch(slice.actions.line({ x0, x1, y0, y1, color }))
}

export const drawPixel = (
  x: SpritesheetPixelIndex,
  y: SpritesheetPixelIndex,
  color: PaletteIndex
): Thunk => async (dispatch) => {
  dispatch(slice.actions.pset({ x, y, color }))
}

export const updateSpritesheet = (
  changes: PartialSpritesheetState
): Thunk => async (dispatch) => {
  dispatch(slice.actions.update(changes))
}

export default slice
