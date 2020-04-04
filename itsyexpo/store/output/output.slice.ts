import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { selectDisk } from "@highvalley.systems/itsyexpo/store/disk"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export const appendOutput = (newOutput: string[]): Thunk => async (
  dispatch,
  getState
) => {
  const id = selectDisk(getState())
  dispatch(slice.actions.append({ id, lines: newOutput }))
}

export const clearOutput = (newOutput: string[]): Thunk => async (
  dispatch,
  getState
) => {
  const id = selectDisk(getState())
  dispatch(slice.actions.clear({ id }))
}

export const selectOutput = ({ output }): string[] => output

export const selectActiveOutput = createSelector(
  [selectOutput, selectDisk],
  (output, disk) => output[disk] || []
)

export default slice
