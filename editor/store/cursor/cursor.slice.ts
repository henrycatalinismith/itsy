import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { Thunk } from "@itsy.studio/editor/store";

export interface CursorState {
  x: number;
  y: number;
}

const name = "cursor";

const initialState: CursorState = {
  x: 0,
  y: 0
};

const reducers = {
  move(cursor, action: PayloadAction<{ x: number; y: number }>) {
    cursor.x = action.payload.x;
    cursor.y = action.payload.y;
  }
};

const slice = createSlice({
  name,
  initialState,
  reducers
});

export const moveCursor = (x: number, y: number): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.move({ x, y }));
};

export const cursorSelector = ({ cursor }) => cursor;

export default slice;
