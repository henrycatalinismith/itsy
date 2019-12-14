import { AppLoading } from "expo"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import React from "react"
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { Provider } from "react-redux"

import Storybook from "./storybook"

import Home from "./screens/home"
import Disk from "./screens/disk"
import Code from "./screens/code"
import Help from "./screens/help"

import store from "./store"

const routes = {
  Home: {
    screen: Home,
  },
  Disk: {
    screen: Disk,
  },
  Code: {
    screen: Code,
  },
  Help: {
    screen: Help,
  },
}

const AppNavigator = createStackNavigator(routes)
const AppContainer = createAppContainer(AppNavigator)

function App({ skipLoadingScreen }): React.ReactElement {
  const [ready, setReady] = React.useState(false)

  const loadResourcesAsync = async (): Promise<[void[], void]> => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        "overpass-mono-regular": require("./assets/fonts/overpass-mono-regular.ttf"),
        "overpass-mono-bold": require("./assets/fonts/overpass-mono-bold.ttf"),
      }),
    ])
  }

  const handleLoadingError = error => {
    console.warn(error)
  }

  if (!ready && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => setReady(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

const useStorybook = false
export default useStorybook ? Storybook : App
