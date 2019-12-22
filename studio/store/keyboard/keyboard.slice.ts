import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "@itsy.studio/studio/store"
import { KeyboardEvent } from "react-native"

interface KeyboardState {
  height: number
  visible: boolean
}

const name = "keyboard"

const initialState: KeyboardState = {
  height: 0,
  visible: false,
}

const reducers = {
  hide(keyboard) {
    keyboard.height = 0
    keyboard.visible = false
  },

  show(keyboard, action: PayloadAction<number>) {
    keyboard.height = action.payload
    keyboard.visible = true
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const hideKeyboard = (event: KeyboardEvent): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.hide())
}

export const showKeyboard = (event: KeyboardEvent): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.show(event.endCoordinates.height))
}

export const selectKeyboard = ({ keyboard }): KeyboardState => keyboard

export const selectKeyboardHeight = createSelector(
  [selectKeyboard],
  ({ height }): number => height
)

export const selectKeyboardVisibility = createSelector(
  [selectKeyboard],
  ({ visible }) => visible
)

export default slice
