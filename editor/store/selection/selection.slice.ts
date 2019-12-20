import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/editor/store"

export interface SelectionPoint {
  x: number
  y: number
}

export interface SelectionState {
  start: SelectionPoint
  end: SelectionPoint
}

const name = "selection"

const initialState: SelectionState = {
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
    action: PayloadAction<{ start: SelectionPoint; end: SelectionPoint }>
  ) {
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
  start: SelectionPoint,
  end: SelectionPoint
): Thunk => async (dispatch) => {
  dispatch(slice.actions.update({ start, end }))
}

export const selectionSelector = ({ selection }) => selection

export default slice
