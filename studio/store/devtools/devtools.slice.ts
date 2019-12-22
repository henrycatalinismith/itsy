import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface DevtoolsState {}

const name = "devtools"

const initialState: DevtoolsState = {}

const reducers = {
  // show(devtools) {
  // devtools.visible = true
  // },
}

export const selectDevtools = ({ devtools }) => devtools

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export default slice
