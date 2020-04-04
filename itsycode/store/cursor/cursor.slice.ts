import { Thunk } from "@highvalley.systems/itsycode/store"
import { Point } from "@highvalley.systems/typedefs/itsy"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const name = "cursor"

const initialState: Point = {
  x: 0,
  y: 0,
}

const reducers = {
  move(cursor, action: PayloadAction<Point>) {
    cursor.x = action.payload.x
    cursor.y = action.payload.y
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const moveCursor = (point: Point): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.move(point))
}

export const selectCursor = ({ cursor }) => cursor

export default slice
