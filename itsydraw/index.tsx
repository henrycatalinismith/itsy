import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Graphics from "@highvalley.systems/itsydraw/components/graphics"
import store from "@highvalley.systems/itsydraw/store"
import { startWebview } from "@highvalley.systems/itsydraw/store/webview"

const root = document.createElement("div")
document.body.appendChild(root)
document.body.style.margin = "0"

const graphics = (
  <Provider store={store}>
    <Graphics />
  </Provider>
)

document.addEventListener("DOMContentLoaded", () => {
  store.dispatch<any>(startWebview())
})

ReactDOM.render(graphics, root)
