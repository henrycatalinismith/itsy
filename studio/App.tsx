import { AppLoading } from "expo"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import React from "react"
import { EmitterSubscription, Keyboard } from "react-native"
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { Provider } from "react-redux"

import Storybook from "./storybook"

import Home from "./screens/home"
import Disk from "./screens/disk"
import Code from "./screens/code"
import Help from "./screens/help"

import store from "./store"
import keyboard from "@itsy.studio/studio/store/keyboard"

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
  const keyboardHideListener = React.useRef<EmitterSubscription>()
  const keyboardShowListener = React.useRef<EmitterSubscription>()
  const [ready, setReady] = React.useState(false)

  const loadResourcesAsync = async (): Promise<void> => {
    return Font.loadAsync({
      "overpass-mono-regular": require("./assets/fonts/overpass-mono-regular.ttf"),
      "overpass-mono-bold": require("./assets/fonts/overpass-mono-bold.ttf"),
    })
  }

  const keyboardDidHide = React.useCallback(() => {
    store.dispatch(keyboard.actions.hide())
  }, [])

  const keyboardDidShow = React.useCallback(() => {
    store.dispatch(keyboard.actions.show())
  }, [])

  React.useEffect(() => {
    keyboardHideListener.current = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    )
    keyboardShowListener.current = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    )
    return () => {
      keyboardHideListener.current.remove()
      keyboardShowListener.current.remove()
    }
  }, [])

  const handleLoadingError = (error) => {
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
