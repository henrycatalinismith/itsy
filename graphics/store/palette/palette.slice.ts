import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/graphics/store"
import pico8 from "@itsy.studio/palettes/pico8/original.es6"

export type PaletteIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15

export interface PaletteColor {
  hex: string
  active: boolean
}

export type PaletteState = {
  [i in PaletteIndex]: PaletteColor
}

const name = "palette"

const initialState: PaletteState = _.zipObject(
  _.range(16),
  _.range(16).map((i) => ({
    hex: pico8[i],
    active: false,
  }))
)

const reducers = {
  activate(palette, action: PayloadAction<PaletteIndex>) {
    _.filter(palette, "active").forEach((color) => {
      color.active = false
    })
    palette[action.payload].active = true
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const activateColor = (i: PaletteIndex): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.activate(i))
}

export const selectPalette = ({ palette }) => palette

export const selectActiveColor = createSelector(
  [selectPalette],
  (palette): PaletteState => _.find(palette, "active")
)

export default slice
