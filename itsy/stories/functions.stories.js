import React from "react"
import frontMatter from "gray-matter"
import { storiesOf } from "@storybook/react"
import ItsyDecorator from "../components/ItsyDecorator"

const stories = storiesOf("Functions", module)

stories.addDecorator(story => (
  <ItsyDecorator>{story()}</ItsyDecorator>
))

const req = require.context(`${__dirname}/../functions`, true, /\.md$/)
req.keys().forEach(filename => {
  const markdown = req(filename)
  const doc = frontMatter(markdown)
  console.log(doc.data.example)
  if (!doc.data.example) {
    return
  }

  stories.add(doc.data.name, () => doc.data.example)
})
