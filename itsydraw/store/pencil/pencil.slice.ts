import { Thunk } from "@highvalley.systems/itsydraw/store"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { PaletteColor, PaletteIndex } from "@highvalley.systems/typedefs/itsy"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface PencilState {
  color: PaletteIndex
}

const name = "pencil"

const initialState: PencilState = {
  color: 0,
}

const reducers = {
  color(pencil, action: PayloadAction<PaletteIndex>): void {
    pencil.color = action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const activatePencilColor = (i: PaletteIndex): Thunk => async (
  dispatch,
  getState
) => {
  if (getState().pencil.color === i) {
    return
  }
  dispatch(slice.actions.color(i as PaletteIndex))
}

export const selectPencil = ({ pencil }) => pencil

export const selectPencilColor = createSelector(
  [selectPencil, selectPalette],
  (pencil, palette): PaletteColor => palette[pencil.color]
)

export default slice
