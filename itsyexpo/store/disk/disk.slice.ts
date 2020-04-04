import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const name = "disk"

const initialState = "empty"

const reducers = {
  open(disk, action: PayloadAction<string>): string {
    return action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const actions = slice.actions

export const openDisk = (id: string): Thunk => async (dispatch) => {
  dispatch(slice.actions.open(id))
}

export const selectDisk = ({ disk }): string => disk

export default slice
