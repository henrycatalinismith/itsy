import React from "react"
import { storiesOf } from "@storybook/react-native"

import Center from "../center"
import Divider from "./divider.component"

const orientations = ["landscape", "portrait"]

const stories = storiesOf("Divider", module)

stories.addDecorator((story) => <Center>{story()}</Center>)

orientations.forEach((orientation) => {
  const props = {
    orientation,
  }
  stories.add(`[${orientation}]`, () => <Divider {...props} />)
})
