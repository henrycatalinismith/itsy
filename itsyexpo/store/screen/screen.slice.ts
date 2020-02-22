import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { selectKeyboardHeight } from "@highvalley.systems/itsyexpo/store/keyboard"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { Rect } from "@itsy.studio/types/geometry"

export enum ScreenOrientation {
  landscape = "landscape",
  portrait = "portrait",
}

const name = "screen"

const initialState: Rect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

const reducers = {
  resize(screen, action: PayloadAction<Rect>) {
    screen.width = action.payload.width
    screen.height = action.payload.height
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const resizeScreen = (width: number, height: number): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(
    slice.actions.resize({
      width,
      height,
      x: 0,
      y: 0,
    })
  )
}

export const selectScreen = ({ screen }): Rect => screen

export const selectScreenHeight = createSelector(
  selectScreen,
  ({ height }) => height
)

export const selectScreenWidth = createSelector(
  selectScreen,
  ({ width }) => width
)

export const selectScreenHeightMinusKeyboardHeight = createSelector(
  [selectScreenHeight, selectKeyboardHeight],
  (screenHeight, keyboardHeight) => screenHeight - keyboardHeight
)

export const selectScreenOrientation = createSelector(
  selectScreen,
  ({ width, height }) => {
    if (width > height) {
      return ScreenOrientation.landscape
    } else {
      return ScreenOrientation.portrait
    }
  }
)

export default slice
