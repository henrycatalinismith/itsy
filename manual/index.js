import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { createLogger } from "redux-logger"
import Manual from "./components/manual"
import url from "url"

import marked from "marked"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import "./stylesheets/itsy.css"

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
const pages = all(require.context("./pages", true, /\.md$/))

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
    navigate: () => "",
    search: (prev, { query }) => query,
  }),

  results: reducer([], {
    navigate: () => [],
    search: (prev, { query }) => {
      if (query == "") {
        return []
      }

      const scoredPages = _.map(_.values(content), page => {
        page.score = 0
        const title = _.get(page, "frontMatter.title", "")
        const description = _.get(page, "frontMatter.description", "")
        if (title === query) {
          page.score = Infinity
        } else if (title.startsWith(query)) {
          page.score = query.length * Math.pow(2, 8)
        } else if (title.includes(query)) {
          page.score = query.length * Math.pow(2, 7)
        } else if (description.includes(query)) {
          page.score = query.length * Math.pow(2, 1)
        }
        return page
      })

      const results = _.filter(scoredPages, page => {
        return page.score > 0 && page.frontMatter.path !== "/'"
      })

      _.sortBy(results, ["score"])

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
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
