import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/manual/store"
import { Page } from "@itsy.studio/types/manual"

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

export const navigate = (path: string): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.navigate(path))
  location.hash = path
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  })
}

export const locationSelector = ({ location }) => location

export const currentPage = ({ location, pages }) => {
  if (location === "/search") {
    const searchPage: Page = {
      path: "/search",
      title: "search",
      description: "search",
      css: "",
      body: "",
    }
    return searchPage
  }
  return pages[location]
}

export default slice
