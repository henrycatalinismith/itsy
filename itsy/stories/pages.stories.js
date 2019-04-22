import React from "react"
import path from "path"
import { storiesOf, addParameters } from "@storybook/react"

const stories = storiesOf("Pages", module)

stories.addParameters({
  viewport: {
    defaultViewport: "iphone5",
  }
})

const req = require.context(`${__dirname}/../pages`, true, /\.js$/)
req.keys().forEach(filename => {
  const page = req(filename).default
  const name = path.basename(filename, ".js")
  stories.add(name, page)
})
