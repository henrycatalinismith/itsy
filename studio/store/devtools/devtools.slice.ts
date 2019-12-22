import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "@itsy.studio/studio/store"
import { playDisk, stopDisk } from "@itsy.studio/studio/store/disks"
import { keyboardVisibility } from "@itsy.studio/studio/store/keyboard"
import { playerRunning } from "@itsy.studio/studio/store/player"

export interface DevtoolsState {}

const name = "devtools"

const initialState: DevtoolsState = {}

const reducers = {
  // show(devtools) {
  // devtools.visible = true
  // },
}

export const onPlayTabTouch = (): Thunk => async (dispatch, getState) => {
  const state = getState()

  if (playerRunning(state)) {
    dispatch(stopDisk())
  } else {
    dispatch(playDisk())
  }
}

export const selectDevtools = ({ devtools }) => devtools

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export default slice
