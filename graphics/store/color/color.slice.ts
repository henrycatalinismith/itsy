import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import { Thunk } from "@itsy.studio/graphics/store"

import {
  PaletteColor,
  PaletteIndex,
  selectPalette,
} from "@itsy.studio/graphics/store/palette"

const name = "color"

const initialState: any = 0

const reducers = {
  activate(color, action: PayloadAction<PaletteIndex>): PaletteIndex {
    return action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const activateColor = (i: PaletteIndex): Thunk => async (dispatch) => {
  dispatch(slice.actions.activate(i as PaletteIndex))
}

export const selectColor = ({ color }) => color

export const selectActiveColor = createSelector(
  [selectColor, selectPalette],
  (color, palette): PaletteColor => palette[color]
)

export default slice
