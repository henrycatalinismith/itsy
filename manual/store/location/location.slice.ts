import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/manual/store"

const name = "location"

const initialState = "/"

const reducers = {
  navigate(location, action: PayloadAction<string>) {
    return action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const locationSelector = ({ location }) => location

export const currentPage = ({ location, pages }) => pages[location]

export default slice
