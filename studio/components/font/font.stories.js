import React from "react"
import { storiesOf } from "@storybook/react-native"

import Center from "../center"
import Font from "./font.component"

const stories = storiesOf("Font", module)

stories.addDecorator(story => <Center>{story()}</Center>)

stories.add("[qwertyuiop]", () => <Font>{"qwertyuiop"}</Font>)
