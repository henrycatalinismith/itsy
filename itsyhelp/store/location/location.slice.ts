import { Thunk } from "@highvalley.systems/itsyhelp/store"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export const selectLocation = ({ location }) => location

export const selectCurrentPage = ({ location, pages }) => {
  if (location === "/search") {
    const searchPage: HelpPage = {
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
