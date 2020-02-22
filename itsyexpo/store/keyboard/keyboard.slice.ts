import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { KeyboardEvent } from "react-native"

export enum KeyboardStatus {
  hidden = "hidden",
  hiding = "hiding",
  showing = "showing",
  visible = "visible",
}

interface KeyboardState {
  height: number
  status: KeyboardStatus
}

const name = "keyboard"

const initialState: KeyboardState = {
  height: 0,
  status: KeyboardStatus.hidden,
}

const reducers = {
  didHide(keyboard) {
    keyboard.height = 0
    keyboard.status = KeyboardStatus.hidden
  },

  didShow(keyboard, action: PayloadAction<number>) {
    keyboard.height = action.payload
    keyboard.status = KeyboardStatus.visible
  },

  willHide(keyboard) {
    keyboard.status = KeyboardStatus.hiding
  },

  willShow(keyboard, action: PayloadAction<number>) {
    keyboard.height = action.payload
    keyboard.status = KeyboardStatus.showing
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const keyboardDidHide = (event: KeyboardEvent): Thunk => async (
  dispatch
) => {
  dispatch(slice.actions.didHide())
}

export const keyboardDidShow = (event: KeyboardEvent): Thunk => async (
  dispatch
) => {
  dispatch(slice.actions.didShow(event.endCoordinates.height))
}

export const keyboardWillHide = (event: KeyboardEvent): Thunk => async (
  dispatch
) => {
  dispatch(slice.actions.willHide())
}

export const keyboardWillShow = (event: KeyboardEvent): Thunk => async (
  dispatch
) => {
  dispatch(slice.actions.willShow(event.endCoordinates.height))
}

export const selectKeyboard = ({ keyboard }): KeyboardState => keyboard

export const selectKeyboardHeight = createSelector(
  [selectKeyboard],
  ({ height }): number => height
)

export const selectKeyboardVisibility = createSelector(
  [selectKeyboard],
  ({ status }) => status === KeyboardStatus.visible
)

export default slice
