import { Asset } from "expo-asset"
import React from "react"
import { storiesOf } from "@storybook/react-native"

import Editor from "./editor.component"

const editorModule = require("../../assets/webviews/editor.html")
const editorAsset = Asset.fromModule(editorModule)

const stories = storiesOf("Editor", module)

stories.add("defaults", () => (
  <Editor sourceUri={editorAsset.uri} />
))
