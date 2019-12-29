import _ from "lodash"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { selectKeyboardHeight } from "@itsy.studio/studio/store/keyboard"
import { Rect } from "@itsy.studio/types/geometry"
import { Thunk } from "@itsy.studio/studio/store"
import { selectScreen } from "@itsy.studio/studio/store/screen"
import { EdgeInsets } from "react-native-safe-area-context/src/SafeArea.types"

const name = "safeArea"

const initialState: Rect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

const reducers = {
  update(safeArea, action: PayloadAction<Rect>) {
    safeArea.x = action.payload.x
    safeArea.y = action.payload.y
    safeArea.width = action.payload.width
    safeArea.height = action.payload.height
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const updateSafeArea = (insets: EdgeInsets): Thunk => async (
  dispatch,
  getState
) => {
  const state = getState()
  const oldSafeArea = selectSafeArea(state)
  const screen = selectScreen(state)
  console.log(insets)

  const newSafeArea: Rect = {
    x: insets.left,
    y: insets.top,
    width: screen.width - insets.right - insets.left,
    height: screen.height - insets.top - insets.bottom,
  }

  if (!_.isEqual(oldSafeArea, newSafeArea)) {
    dispatch(slice.actions.update(newSafeArea))
  }
}

export const selectSafeArea = ({ safeArea }) => safeArea

export default slice
