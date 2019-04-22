import React from "react"
import frontMatter from "gray-matter"
import marked from "marked"

import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
hljs.registerLanguage("lua", lua)

import "../stylesheets/itsy.css"
import Page from "../components/page"
import { storiesOf, addParameters } from "@storybook/react"

marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value
  }
})

const stories = storiesOf("Pages", module)

stories.addParameters({
  viewport: {
    defaultViewport: "iphone5",
  }
})

const req = require.context(`${__dirname}/../pages`, true, /\.md$/)
req.keys().forEach(filename => {
  const markdown = req(filename)
  const doc = frontMatter(markdown)
  const content = marked(doc.content)
  stories.add(doc.data.title, () => (
    <Page title={doc.data.title}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Page>
  ))
})
