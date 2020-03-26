import { Thunk } from "@highvalley.systems/itsydraw/store"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { PaletteColor, PaletteIndex } from "@highvalley.systems/typedefs/itsy"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export type PencilSizes = 1 | 2 | 3 | 4

export interface PencilState {
  color: PaletteIndex
  size: PencilSizes
}

const name = "pencil"

const initialState: PencilState = {
  color: 0,
  size: 1,
}

const reducers = {
  color(pencil, action: PayloadAction<PaletteIndex>): void {
    pencil.color = action.payload
  },

  size(pencil, action: PayloadAction<PencilSizes>): void {
    pencil.size = action.payload
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

export const changePencilSize = (i: PencilSizes): Thunk => async (
  dispatch,
  getState
) => {
  if (getState().pencil.size === i) {
    return
  }
  dispatch(slice.actions.size(i))
}

export const selectPencil = ({ pencil }) => pencil

export const selectPencilColor = createSelector(
  [selectPencil, selectPalette],
  (pencil, palette): PaletteColor => palette[pencil.color]
)

export default slice
