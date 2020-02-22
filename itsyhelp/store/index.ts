import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import logger from "redux-logger"
import { ThunkAction } from "redux-thunk"

import { Page } from "@highvalley.systems/typedefs/manual"

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

  const page: Page = {
    path: frontMatter.path,
    title: frontMatter.title || "",
    description: frontMatter.description || "",
    css: frontMatter.css || "",
    body,
  }

  if (frontMatter.function) {
    page.function = {
      name: page.title,
      category: frontMatter.function.category,
      input: (frontMatter.function.input || []).map((p) => ({
        name: p.name || "",
        type: p.type || "",
        desc: p.desc || "",
        default: p.default || "",
      })),
      output: {
        type: frontMatter.function.output?.type || "",
        desc: frontMatter.function.output?.desc || "",
      },
      examples: Object.entries(frontMatter.function.examples || []).map(
        ([name, lua]) => ({
          name: name as string,
          lua: lua as string,
        })
      ),
    }
  }

  pagesState[frontMatter.path] = page
})

const preloadedState = {
  location: window.location.hash.substring(1) || "/",
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
