import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { KeyboardEvent } from "react-native"

export enum KeyboardModes {
  Hidden = "Hidden",
  Hiding = "Hiding",
  Showing = "Showing",
  Visible = "Visible",
}

interface KeyboardState {
  height: number
  status: KeyboardModes
}

const name = "keyboard"

const initialState: KeyboardState = {
  height: 0,
  status: KeyboardModes.Hidden,
}

const reducers = {
  didHide(keyboard) {
    keyboard.height = 0
    keyboard.status = KeyboardModes.Hidden
  },

  didShow(keyboard, action: PayloadAction<number>) {
    keyboard.height = action.payload
    keyboard.status = KeyboardModes.Visible
  },

  willHide(keyboard) {
    keyboard.status = KeyboardModes.Hiding
  },

  willShow(keyboard, action: PayloadAction<number>) {
    keyboard.height = action.payload
    keyboard.status = KeyboardModes.Showing
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
  ({ status }) => status === KeyboardModes.Visible
)

export default slice
