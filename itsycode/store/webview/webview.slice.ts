import { Thunk } from "@highvalley.systems/itsycode/store"
import { createSlice } from "@reduxjs/toolkit"

export interface WebviewState {}

const name = "webview"

const initialState: WebviewState = {}

const reducers = {
  start(webview) {
    return webview
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const startWebview = (): Thunk => async (dispatch, getState) => {
  // wait a bit before reporting readiness because of this
  // https://github.com/facebook/react-native/issues/11594
  setTimeout(() => {
    dispatch(slice.actions.start())
  }, 300)
}

export const selectWebview = ({ webview }) => webview

export default slice
