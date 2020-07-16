import createWebviewBridgeMiddleware, {
  WebviewBridgeMiddlewareOptions,
} from "@highvalley.systems/itsyexpo/components/webview/webview-bridge.middleware"
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

const isReactNative = !!(window as any).ReactNativeWebView
const middleware = [...getDefaultMiddleware()]

const webviewMiddlewareOptions: WebviewBridgeMiddlewareOptions = {
  slices: {
    cursor,
    selection,
    text,
  },
}
const webviewMiddleware = createWebviewBridgeMiddleware(
  webviewMiddlewareOptions
)
middleware.push(webviewMiddleware)

if (!isReactNative) {
  middleware.push(logger)
}

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
