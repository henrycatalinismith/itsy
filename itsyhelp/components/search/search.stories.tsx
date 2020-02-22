import React from "react"

import { storiesOf, addParameters } from "@storybook/react"
import { Search } from "./search.component"

const stories = storiesOf("Search", module)

stories.addParameters({
  viewport: {
    defaultViewport: "iphone5",
  },
})

stories.add("test", () =>
  React.createElement(() => {
    const [query, search] = React.useState("")
    return <Search query={query} search={search} />
  })
)
