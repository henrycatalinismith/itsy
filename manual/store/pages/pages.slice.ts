import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/manual/store"

export interface Page {
  path: string
  title: string
  css: string
  body: string
}

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
