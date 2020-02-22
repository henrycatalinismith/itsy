import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import url from "url"

import marked from "marked"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import "@highvalley.systems/itsyhelp/stylesheets/itsy.css"

import { Provider } from "react-redux"

import Manual from "@highvalley.systems/itsyhelp/components/manual"
import store from "@highvalley.systems/itsyhelp/store"
import { navigate } from "@highvalley.systems/itsyhelp/store/location"
import { startWebview } from "@highvalley.systems/itsyhelp/store/webview"

hljs.registerLanguage("lua", lua)
marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value
  },
})

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
  ;(store.dispatch as any)(startWebview())
})

ReactDOM.render(manual, root)

window.onclick = (event) => {
  const link = event.target.closest("a")
  if (!link) {
    return
  }
  const path = url.parse(link.href).path
  event.preventDefault()
  ;(store.dispatch as any)(navigate(path))
}

window.onhashchange = () => {
  const path = location.hash.substring(1) || "/"

  if (store.getState().location !== path) {
    ;(store.dispatch as any)(navigate(path))
  }
}