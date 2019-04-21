import React from "react"
import frontMatter from "gray-matter"
import { storiesOf } from "@storybook/react"
import ItsyFunction from "../components/itsy-function"

const stories = storiesOf("Functions", module)

const req = require.context(`${__dirname}/../functions`, true, /\.md$/)
req.keys().forEach(filename => {
  const markdown = req(filename)
  const doc = frontMatter(markdown)

  stories.add(doc.data.name, () => <ItsyFunction {...doc} />)

})
