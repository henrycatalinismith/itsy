import React from "react"
import ReactDOM from "react-dom"
import frontMatter from "gray-matter"
import Text from "@highvalley.systems/spraypaint/components/text"
import pico8 from "@highvalley.systems/spraypaint/palettes/pico8.es6"
import Manual from "../components/manual"
import Page from "../components/page"

import marked from "marked"
import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
import "../stylesheets/itsy.css"

hljs.registerLanguage("lua", lua)
marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value
  }
})

const pages = [
  require("./index.md"),
  require("./game-loop.md"),
  require("./init.md"),
  require("./tick.md"),
  require("./draw.md"),
  require("./api-reference.md"),
  require("../functions/abs.md"),
  require("../functions/add.md"),
  require("../functions/camera.md"),
  require("../functions/ceil.md"),
  require("../functions/circ.md"),
  require("../functions/circfill.md"),
  require("../functions/cls.md"),
  require("../functions/color.md"),
  require("../functions/cos.md"),
  require("../functions/del.md"),
  require("../functions/flr.md"),
  require("../functions/line.md"),
  require("../functions/lower.md"),
  require("../functions/max.md"),
  require("../functions/min.md"),
  require("../functions/pairs.md"),
  require("../functions/peek.md"),
  require("../functions/poke.md"),
  require("../functions/print.md"),
  require("../functions/pset.md"),
  require("../functions/rect.md"),
  require("../functions/rectfill.md"),
  require("../functions/rnd.md"),
  require("../functions/sin.md"),
  require("../functions/sspr.md"),
  require("../functions/sub.md"),
  require("../functions/tan.md"),
  require("../functions/tonum.md"),
  require("../functions/tostr.md"),
  require("../functions/touch.md"),
  require("../functions/touchx.md"),
  require("../functions/touchy.md"),
  require("../functions/type.md"),
  require("../functions/upper.md"),
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

console.log(content)

const root = document.createElement("div")
document.body.appendChild(root)
document.body.style.margin = 0

ReactDOM.render(<Manual content={content} />, root)

