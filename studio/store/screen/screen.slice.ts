import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export const screenSelector = ({ screen: { width, height }}) => ({ width, height })

export const screenOrientation = createSelector(screenSelector, ({ width, height }) => {
  if (width > height) {
    return ScreenOrientation.landscape
  } else {
    return ScreenOrientation.portrait
  }
})

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export default slice
