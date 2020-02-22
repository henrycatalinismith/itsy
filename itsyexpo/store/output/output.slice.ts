import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "@highvalley.systems/itsyexpo/store"

const name = "output"

const initialState = []

const reducers = {
  append(output, action: PayloadAction<string[]>) {
    return [...output, ...action.payload]
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const actions = slice.actions

export const appendOutput = (newOutput: string[]): Thunk => async (
  dispatch
) => {
  dispatch(slice.actions.append(newOutput))
}

export const selectOutput = ({ output }): string[] => output

export default slice
