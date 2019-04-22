import React from "react"
import frontMatter from "gray-matter"
import { storiesOf } from "@storybook/react"
import Decorator from "../components/decorator"

const stories = storiesOf("Examples", module)

stories.addDecorator(story => (
  <Decorator>{story()}</Decorator>
))

const req = require.context(`${__dirname}/../functions`, true, /\.md$/)
req.keys().forEach(filename => {
  const markdown = req(filename)
  const doc = frontMatter(markdown)

  if (doc.data.examples) {
    Object.entries(doc.data.examples).forEach(([name, code]) => {
      const storyName = `${doc.data.name} [${name}]`
      stories.add(storyName, () => code)
    })
  } else {
    stories.add(`${doc.data.name} ❌`, () => "")
  }
})
