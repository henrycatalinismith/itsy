import { storiesOf } from "@storybook/react"
import React from "react"
import Header from "./header"

const stories = storiesOf("Header", module)

stories.add("[default]", () => (
  <Header>
    header
  </Header>
))
