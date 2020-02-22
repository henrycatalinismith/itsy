import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@highvalley.systems/itsydraw/store"
import pico8 from "@itsy.studio/palettes/pico8/original.es6"

// prettier-ignore
export type PaletteIndex =
  |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7
  |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15

export interface PaletteColor {
  id: PaletteIndex
  hex: string
}

export type PaletteState = {
  [i in PaletteIndex]: PaletteColor
}

const name = "palette"

const initialState: PaletteState = _.zipObject(
  _.range(16),
  _.range(16).map((id) => ({
    id,
    hex: pico8[id],
  }))
)

const reducers = {
  import(palette, action: PayloadAction<PaletteState>) {
    return action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const selectPalette = ({ palette }) => palette

export default slice
