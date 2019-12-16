import React from "react"
import { storiesOf } from "@storybook/react-native"

import Center from "../center"
import Play from "./play.component"

const stories = storiesOf("Play", module)

stories.addDecorator((story) => <Center>{story()}</Center>)

stories.add("defaults", () => <Play />)
