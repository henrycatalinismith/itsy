import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import url from "url"

import marked from "marked"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import "@itsy.studio/manual/stylesheets/itsy.css"

import { Provider } from "react-redux"

import Manual from "@itsy.studio/manual/components/manual"
import store from "@itsy.studio/manual/store"
import { navigate } from "@itsy.studio/manual/store/location"
import { startWebview } from "@itsy.studio/manual/store/webview"

hljs.registerLanguage("lua", lua)
marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value
  },
})

/*

const reducers = combineReducers({
  results: reducer([], {
    navigate: () => [],
    search: (prev, { query }) => {
      if (query == "") {
        return []
      }

      const scoredPages = _.map(_.values(content), (page) => {
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

      const results = _.filter(scoredPages, (page) => {
        return page.score > 0 && page.frontMatter.path !== "/'"
      })

      _.sortBy(results, ["score"])

      return results
    },
  }),
})

*/

const root = document.createElement("div")
root.style.display = "flex"
root.style.flexDirection = "column"

document.documentElement.style.backgroundColor = "#fceeff"
document.body.appendChild(root)
document.body.style.margin = "0"

const manual = (
  <Provider store={store}>
    <Manual />
  </Provider>
)

document.addEventListener("DOMContentLoaded", () => {
  store.dispatch(startWebview())
})

ReactDOM.render(manual, root)

window.onclick = (event) => {
  const link = event.target.closest("a")
  if (!link) {
    return
  }
  const path = url.parse(link.href).path
  event.preventDefault()
  store.dispatch(navigate(path))
}

window.onhashchange = () => {
  const path = location.hash.substring(1) || "/"

  if (store.getState().location !== path) {
    store.dispatch(navigate(path))
  }
}
