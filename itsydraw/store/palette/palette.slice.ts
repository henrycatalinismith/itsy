import pico8 from "@highvalley.systems/palettes/pico8/original.es6"
import { Palette } from "@highvalley.systems/typedefs/itsy"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

const name = "palette"

const initialState: Palette = _.zipObject(
  _.range(16),
  _.range(16).map((id) => ({
    id,
    hex: pico8[id],
  }))
)

const reducers = {
  import(palette, action: PayloadAction<Palette>) {
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
