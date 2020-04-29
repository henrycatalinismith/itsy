import { onDiskOpen } from "@highvalley.systems/itsyexpo/store/panels"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { Disk } from "@highvalley.systems/typedefs/itsy"
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
  "disks/create": (diskPanel, action: PayloadAction<Disk>): string => {
    return action.payload.id
  },

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

export const openDisk = (id: string): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.open(id))
  dispatch(onDiskOpen())
}

export const selectDisk = ({ disk }): string => disk

export default slice
