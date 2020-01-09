import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "@itsy.studio/studio/store"
import { playDisk, stopDisk } from "@itsy.studio/studio/store/disks"
import { selectKeyboardVisibility } from "@itsy.studio/studio/store/keyboard"
import { playerRunning } from "@itsy.studio/studio/store/player"
import { Keyboard } from "react-native"

export enum DevtoolsPanelId {
  code = "code",
  play = "play",
  help = "help",
}

export interface DevtoolsState {
  panel: DevtoolsPanelId
}

const name = "devtools"

const initialState: DevtoolsState = {
  panel: DevtoolsPanelId.code,
}

const reducers = {
  togglePanel(devtools, action: PayloadAction<DevtoolsPanelId>) {
    devtools.panel = action.payload
  },
}

export const togglePanel = (id: DevtoolsPanelId): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.togglePanel(id))
}

export const onPlayTabTouch = (): Thunk => async (dispatch, getState) => {
  const state = getState()

  const keyboardVisible = selectKeyboardVisibility(state)
  if (keyboardVisible) {
    Keyboard.dismiss()
  }

  if (playerRunning(state)) {
    dispatch(stopDisk())
  } else {
    dispatch(playDisk())
  }
}

export const selectDevtools = ({ devtools }) => devtools

export const selectDevtoolsPanel = createSelector(
  [selectDevtools],
  ({ panel }): DevtoolsPanelId => panel
)

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export default slice
