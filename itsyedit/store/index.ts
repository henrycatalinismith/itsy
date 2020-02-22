import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import logger from "redux-logger"
import { ThunkAction } from "redux-thunk"

import cursor from "./cursor"
import selection from "./selection"
import text from "./text"
import webview from "./webview"

const postMessageMiddleware = (store) => (next) => (action) => {
  next(action)

  if (!(window as any).ReactNativeWebView || action.__fromWebview) {
    return
  }

  const message = JSON.stringify(action)
  ;(window as any).ReactNativeWebView.postMessage(message)

  if (action.type === "webview/start") {
    ;(window as any).store = store
    ;(window as any).text = text
  }
}

const middleware = [...getDefaultMiddleware(), logger, postMessageMiddleware]

const reducer = combineReducers({
  cursor: cursor.reducer,
  selection: selection.reducer,
  text: text.reducer,
  webview: webview.reducer,
})

const preloadedState = {}

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
})

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
