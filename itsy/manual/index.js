import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { createLogger } from "redux-logger"
import Manual from "../components/manual"
import url from "url"

import marked from "marked"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import "../stylesheets/itsy.css"

import { combineReducers, applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import {
  reducer,
  after,
  before,
} from "@highvalley.systems/signalbox"

hljs.registerLanguage("lua", lua)
marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value
  }
})

const all = r => r.keys().map(r)

const pages = [
  require("./index.md"),
  require("./intro.md"),
  ...all(require.context("../engine", true, /\.md$/)),
  ...all(require.context("../functions", true, /\.md$/)),
]

const content = {}
pages.forEach(page => {
  const frontMatter = page.attributes
  const body = page.body
  content[frontMatter.path] = {
    frontMatter,
    body,
  }
})

const reducers = combineReducers({
  content: reducer(content, {}),

  history: reducer([location.hash.substring(1) || "/"], {
    navigate: (history, destination) => ([
      destination.path,
      ...history,
    ]),
  }),

  query: reducer("", {
    search: (prev, { query }) => query,
  }),

  results: reducer([], {
    search: (prev, { query }) => {
      if (query == "") {
        return []
      }

      const results = _.filter(_.values(content), page => {
        const name = _.get(page, "frontMatter.name", "")
        if (name.includes(query)) {
          return true
        }

        const title = _.get(page, "frontMatter.title", "")
        if (title.includes(query)) {
          return true
        }

        return false
      })
      return results
    }
  })
})

const initialState = {
  content,
  query: "",
  results: [],
}

const middlewares = applyMiddleware.apply(null, [
  createLogger({ collapsed: true }),

  after("navigate", (store, action) => {
    location.hash = action.path
  }),
])

const store = createStore(reducers, initialState, middlewares)

window.onclick = event => {
  const link = event.target.closest("a")
  if (!link) {
    return
  }
  event.preventDefault()
  store.dispatch({
    type: "navigate",
    path: url.parse(link.href).path,
  })
}

window.onhashchange = () => {
  const path = location.hash.substring(1) || "/"
  if (store.getState().history[0] !== path) {
    store.dispatch({ type: "navigate", path })
  }
}

const root = document.createElement("div")
root.style.display = "flex"
root.style.flexDirection = "column"

document.documentElement.style.backgroundColor = "#fceeff"
document.body.appendChild(root)
document.body.style.margin = 0

const manual = (
  <Provider store={store}>
    <Manual />
  </Provider>
)

ReactDOM.render(manual, root)
