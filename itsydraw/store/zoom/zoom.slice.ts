import { Thunk } from "@highvalley.systems/itsydraw/store"
import { PaletteIndex } from "@highvalley.systems/typedefs/itsy"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const name = "zoom"

// export type ZoomLevel = 1 |  2 |  3 |  4

const initialState: number = 1

const reducers = {
  change(zoom, action: PayloadAction<number>): number {
    return action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const zoomTo = (l: number): Thunk => async (dispatch, getState) => {
  if (selectZoom(getState()) === l) {
    return
  }
  dispatch(slice.actions.change(l))
}

export const selectZoom = ({ zoom }) => zoom

export default slice
