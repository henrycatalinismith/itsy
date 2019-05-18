import colors from "ansi-colors"
import frontMatter from "gray-matter"
import React from "react"
import ReactDOM from "react-dom"
import { createLogger } from "redux-logger"
import Text from "@highvalley.systems/spraypaint/components/text"
import pico8 from "@highvalley.systems/spraypaint/palettes/pico8.es6"
import Manual from "../components/manual"
import Page from "../components/page"
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

const pages = [
  require("./index.md"),
  require("./intro.md"),
  require("./game-loop.md"),
  require("./init.md"),
  require("./tick.md"),
  require("./draw.md"),
  require("./functions.md"),

  require("../functions/abs/abs.md"),
  require("../functions/add/add.md"),
  require("../functions/camera/camera.md"),
  require("../functions/ceil/ceil.md"),
  require("../functions/circ/circ.md"),
  require("../functions/circfill/circfill.md"),
  require("../functions/cls/cls.md"),
  require("../functions/color/color.md"),
  require("../functions/cos/cos.md"),
  require("../functions/del/del.md"),
  require("../functions/flr/flr.md"),
  require("../functions/line/line.md"),
  require("../functions/lower/lower.md"),
  require("../functions/max/max.md"),
  require("../functions/min/min.md"),
  require("../functions/pairs/pairs.md"),
  require("../functions/peek/peek.md"),
  require("../functions/poke/poke.md"),
  require("../functions/print/print.md"),
  require("../functions/pset/pset.md"),
  require("../functions/rect/rect.md"),
  require("../functions/rectfill/rectfill.md"),
  require("../functions/rnd/rnd.md"),
  require("../functions/sin/sin.md"),
  require("../functions/sspr/sspr.md"),
  require("../functions/sub/sub.md"),
  require("../functions/tan/tan.md"),
  require("../functions/tonum/tonum.md"),
  require("../functions/tostr/tostr.md"),
  require("../functions/touch/touch.md"),
  require("../functions/touchx/touchx.md"),
  require("../functions/touchy/touchy.md"),
  require("../functions/type/type.md"),
  require("../functions/upper/upper.md"),
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
})

const initialState = {
  content,
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
