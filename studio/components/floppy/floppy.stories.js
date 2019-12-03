import React from "react"
import { storiesOf } from "@storybook/react-native"

import Center from "../center"
import Floppy from "./floppy.component"

const stories = storiesOf("Floppy", module)

stories.addDecorator(story => <Center>{story()}</Center>)

stories.add("defaults", () => <Floppy />)
