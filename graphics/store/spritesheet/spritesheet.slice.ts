import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/graphics/store"

import { PaletteIndex } from "@itsy.studio/graphics/store/palette"

// prettier-ignore
export type SpritesheetPixelIndex =
  |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7
  |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15
  | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
  | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
  | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
  | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47
  | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55
  | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63

export type SpritesheetState = {
  [i in SpritesheetPixelIndex]: {
    [i in SpritesheetPixelIndex]: PaletteIndex
  }
}

const name = "spritesheet"

const initialState: SpritesheetState = _.zipObject(
  _.range(64),
  _.range(64).map(() => _.zipObject(_.range(64), _.fill(Array(64), 0)))
)

const reducers = {
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
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const selectSpritesheet = ({ spritesheet }) => spritesheet

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

export default slice
