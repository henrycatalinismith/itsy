import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import logger from "redux-logger"
import { ThunkAction } from "redux-thunk"

import color from "./color"
import palette from "./palette"
import spritesheet from "./spritesheet"
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
  }
}

const middleware = [...getDefaultMiddleware(), logger, postMessageMiddleware]

const reducer = combineReducers({
  color: color.reducer,
  palette: palette.reducer,
  spritesheet: spritesheet.reducer,
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
