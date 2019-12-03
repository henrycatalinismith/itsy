import React from "react"
import { storiesOf } from "@storybook/react-native"

import Center from "../center"
import Stop from "./stop.component"

const stories = storiesOf("Stop", module)

stories.addDecorator(story => <Center>{story()}</Center>)

stories.add("defaults", () => <Stop />)
