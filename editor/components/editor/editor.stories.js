import { storiesOf } from "@storybook/react"
import React from "react"
import { Editor } from "./editor.component"

const stories = storiesOf("Editor", module)

stories.add("loading", () => <Editor loading />)
