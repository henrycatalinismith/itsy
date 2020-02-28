import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@highvalley.systems/itsydraw/store"

import { PaletteColor, PaletteIndex } from "@highvalley.systems/typedefs/itsy"

import pico8 from "@highvalley.systems/palettes/pico8/original.es6"

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
