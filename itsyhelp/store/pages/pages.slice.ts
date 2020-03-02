import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import { createSlice } from "@reduxjs/toolkit"

export interface PagesState {
  [path: string]: HelpPage
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
