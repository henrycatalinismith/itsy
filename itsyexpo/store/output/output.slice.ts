import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const name = "output"

const initialState: { [id: string]: string[] } = {}

const reducers = {
  append(output, action: PayloadAction<{ id: string; lines: string[] }>) {
    const { id, lines } = action.payload
    output[id] = [...(output[id] || []), ...lines]
  },

  clear(output, action: PayloadAction<{ id: string }>) {
    const { id } = action.payload
    delete output[id]
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const actions = slice.actions

export const appendOutput = (id: string, newOutput: string[]): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.append({ id, lines: newOutput }))
}

export const clearOutput = (id: string): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.clear({ id }))
}

export default slice
