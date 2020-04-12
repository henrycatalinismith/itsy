import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const name = "disk"

const initialState = "empty"

const reducers = {
  close(): string {
    return "empty"
  },

  open(disk, action: PayloadAction<string>): string {
    return action.payload
  },
}

const extraReducers = {
  "disks/delete": (diskPanel): string => {
    return "empty"
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
})

export const actions = slice.actions

export const closeDisk = (): Thunk => async (dispatch) => {
  dispatch(slice.actions.close())
}

export const openDisk = (id: string): Thunk => async (dispatch) => {
  dispatch(slice.actions.open(id))
}

export const selectDisk = ({ disk }): string => disk

export default slice
