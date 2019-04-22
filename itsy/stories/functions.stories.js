import React from "react"
import frontMatter from "gray-matter"
import { storiesOf, addParameters } from "@storybook/react"
import Function from "../components/function"

const stories = storiesOf("Functions", module)

stories.addParameters({
  viewport: {
    defaultViewport: "iphone5",
  }
})

const req = require.context(`${__dirname}/../functions`, true, /\.md$/)
req.keys().forEach(filename => {
  const markdown = req(filename)
  const doc = frontMatter(markdown)
  stories.add(doc.data.name, () => <Function {...doc} />)
})
