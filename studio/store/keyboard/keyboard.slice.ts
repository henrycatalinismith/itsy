import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface KeyboardState {
  visible: boolean
}

const name = "keyboard"

const initialState: KeyboardState = {
  visible: false,
}

const reducers = {
  hide(keyboard) {
    keyboard.visible = false
  },

  show(keyboard) {
    keyboard.visible = true
  },
}

export const keyboardSelector = ({ keyboard }): KeyboardState => keyboard
export const keyboardVisibility = createSelector(
  [keyboardSelector],
  ({ visible }) => visible
)

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export default slice
