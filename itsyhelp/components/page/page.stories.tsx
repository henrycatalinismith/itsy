/*
import React from "react"
import frontMatter from "gray-matter"
import marked from "marked"

import hljs from "highlight.js/lib/highlight"
import lua from "highlight.js/lib/languages/lua"
hljs.registerLanguage("lua", lua)

// import Page from "./page.component"
import { storiesOf, addParameters } from "@storybook/react"

marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value
  },
})

const stories = storiesOf("Page", module)

stories.addParameters({
  viewport: {
    defaultViewport: "iphone5",
  },
})

console.log("lol")
// stories.add("test", () => <pre>{123}</pre>)


*/
/*
const req = require.context("../../pages", false, /\.md$/)
req.keys().forEach(filename => {
  const markdown = req(filename)

  stories.add(filename, () => (
    <pre>{filename}</pre>
  ))
  return

  const doc = frontMatter(markdown)
  const content = marked(doc.content)

  stories.add(doc.data.title, () => (
    <Page title={doc.data.title}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Page>
  ))
})
*/
