import { storiesOf } from "@storybook/react"
import React from "react"
import Ident from "./ident"

const stories = storiesOf("Ident", module)

stories.add("[default]", () => (
  <Ident />
))
