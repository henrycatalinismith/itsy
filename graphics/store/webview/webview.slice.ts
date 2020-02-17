import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/graphics/store"

export interface WebviewState {
  started: boolean
  imported: boolean
}

const name = "webview"

const initialState: WebviewState = {
  started: false,
  imported: false,
}

const reducers = {
  start(webview) {
    webview.started = true
  },

  import(webview) {
    webview.imported = true
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const startWebview = (): Thunk => async (dispatch, getState) => {
  // wait a bit before rereadiness because of this
  // https://github.com/facebook/react-native/issues/11594
  setTimeout(() => {
    dispatch(slice.actions.start())
  }, 300)
}

export const importWebview = (): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.import())
}

export const selectWebview = ({ webview }) => webview
export const webviewSelector = ({ webview }) => webview

export default slice
