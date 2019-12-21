import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import logger from "redux-logger"
import { ThunkAction } from "redux-thunk"

import location from "./location"
import pages from "./pages"
import query from "./query"
import webview from "./webview"

const middleware = [...getDefaultMiddleware(), logger]

const reducer = combineReducers({
  location: location.reducer,
  pages: pages.reducer,
  query: query.reducer,
  webview: webview.reducer,
})

const all = (r) => r.keys().map(r)
const markdownFiles = all(require.context("../pages", true, /\.md$/))

const pagesState = {}
markdownFiles.forEach((mardown) => {
  const frontMatter = mardown.attributes
  const body = mardown.body
  pagesState[frontMatter.path] = {
    path: frontMatter.path,
    title: frontMatter.title || "",
    description: frontMatter.description || "",
    css: frontMatter.css || "",
    body,
  }
})

const preloadedState = {
  pages: pagesState,
}

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
})

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
