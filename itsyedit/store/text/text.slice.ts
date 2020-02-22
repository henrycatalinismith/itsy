import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@highvalley.systems/itsyedit/store"

const name = "text"

const initialState = ""

const reducers = {
  change(text, action: PayloadAction<string>) {
    return action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const changeText = (text: string): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.change(text))
}

export const textSelector = ({ text }) => text

export default slice
