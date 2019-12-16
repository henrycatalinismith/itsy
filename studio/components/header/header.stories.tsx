import React from "react"
import { storiesOf } from "@storybook/react-native"

import Center from "../center"
import Header from "./header.component"

const routes = [
  {
    routeName: "Home",
  },
]

const screens = {
  Home: {
    navigation: {
      state: {
        index: 0,
        routes,
      },
    },
  },
}

const stories = storiesOf("Header", module)

Object.entries(screens).forEach(([routeName, screen]) => {
  stories.add(`[${routeName}]`, () => <Header {...screen} />)
})
