import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@highvalley.systems/itsyedit/store"
import { Point2D } from "@itsy.studio/types"

export interface SelectionState {
  text: string
  start: Point2D
  end: Point2D
}

const name = "selection"

const initialState: SelectionState = {
  text: "",
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
}

const reducers = {
  update(
    selection,
    action: PayloadAction<{
      start: Point2D
      end: Point2D
      text: string
    }>
  ) {
    selection.text = action.payload.text
    selection.start.x = action.payload.start.x
    selection.start.y = action.payload.start.y
    selection.end.x = action.payload.end.x
    selection.end.y = action.payload.end.y
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const updateSelection = (
  start: Point2D,
  end: Point2D,
  text: string
): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.update({ start, end, text }))
}

export const selectionSelector = ({ selection }) => selection

export default slice
