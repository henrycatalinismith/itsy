import React from "react"
import { storiesOf } from "@storybook/react-native"

import Center from "../center"
import Disk from "./disk.component"

const stories = storiesOf("Disk", module)

stories.addDecorator(story => <Center>{story()}</Center>)

stories.add("defaults", () => <Disk disk={{}} edit={{}} size={128} />)
