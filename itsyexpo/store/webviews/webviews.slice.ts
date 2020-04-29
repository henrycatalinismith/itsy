import delay from "delay"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

export enum WebviewStatuses {
  Loading = "Loading",
  Offline = "Offline",
  Online = "Online",
}

export enum WebviewIds {
  code = "code",
  draw = "draw",
  help = "help",
}

export interface Webview {
  id: WebviewIds
  status: WebviewStatuses
}

export interface WebviewsState {
  [id: string]: Webview
}

const name = "webviews"

const initialState: WebviewsState = {
  [WebviewIds.code]: {
    id: WebviewIds.code,
    status: WebviewStatuses.Offline,
  },

  [WebviewIds.draw]: {
    id: WebviewIds.draw,
    status: WebviewStatuses.Offline,
  },

  [WebviewIds.help]: {
    id: WebviewIds.help,
    status: WebviewStatuses.Offline,
  },
}

const reducers = {
  load(webviews, action: PayloadAction<WebviewIds>) {
    webviews[action.payload].status = WebviewStatuses.Loading
  },

  ready(webviews, action: PayloadAction<WebviewIds>) {
    webviews[action.payload].status = WebviewStatuses.Online
  },

  stop(webviews, action: PayloadAction<WebviewIds>) {
    webviews[action.payload].status = WebviewStatuses.Offline
  },
}

const extraReducers = {}

const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
})

export const loadWebview = (id: WebviewIds): Thunk => async (
  dispatch,
  getState
) => {
  for (let attempt = 0; attempt < 99; attempt++) {
    const queue = selectLoadingWebviews(getState())

    if (queue.length === 0) {
      dispatch(slice.actions.load(id))
      return
    }

    await delay(100)
  }
}

export const finishLoadingWebview = (id: WebviewIds): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.ready(id))
}

export const stopWebview = (id: WebviewIds): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.stop(id))
}

export const selectWebviews = ({ webviews }): WebviewsState => webviews

export const selectLoadingWebviews = createSelector(
  [selectWebviews],
  (webviews): Webview[] =>
    _.filter(webviews, { status: WebviewStatuses.Loading })
)

export const selectCodeWebview = createSelector(
  [selectWebviews],
  (webviews): Webview => webviews.code as Webview
)

export const selectDrawWebview = createSelector(
  [selectWebviews],
  (webviews): Webview => webviews.draw as Webview
)

export const selectHelpWebview = createSelector(
  [selectWebviews],
  (webviews): Webview => webviews.help as Webview
)

export default slice
