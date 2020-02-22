import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@highvalley.systems/itsyhelp/store"
import { Page } from "@itsy.studio/types/manual"

export interface PagesState {
  [path: string]: Page
}

const name = "pages"

const initialState: PagesState = {}

const reducers = {}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const pagesSelector = ({ pages }) => pages

export default slice
