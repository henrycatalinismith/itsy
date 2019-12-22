import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { selectKeyboardHeight } from "@itsy.studio/studio/store/keyboard"

export enum ScreenOrientation {
  landscape = "landscape",
  portrait = "portrait",
}

interface ScreenState {
  width: number
  height: number
}

interface ScreenResize {
  width: number
  height: number
}

const name = "screen"

const initialState: ScreenState = {
  width: 0,
  height: 0,
}

const reducers = {
  resize(screen, action: PayloadAction<ScreenResize>) {
    screen.width = action.payload.width
    screen.height = action.payload.height
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const selectScreen = ({ screen: { width, height } }) => ({
  width,
  height,
})

export const selectScreenHeight = createSelector(
  selectScreen,
  ({ height }) => height
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
