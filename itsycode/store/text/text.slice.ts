import { Thunk } from "@highvalley.systems/itsycode/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export const selectText = ({ text }) => text

export default slice
