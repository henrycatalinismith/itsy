import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/manual/store"

const name = "query"

const initialState = "/"

const reducers = {
  search(query, action: PayloadAction<string>) {
    return action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const querySelector = ({ query }) => query

export default slice
