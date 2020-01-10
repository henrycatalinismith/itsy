import { AppLoading, ScreenOrientation } from "expo"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import React from "react"
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  EventSubscription,
  Dimensions,
} from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { Provider } from "react-redux"

import Storybook from "./storybook"

import Home from "./screens/home"
import Disk from "./screens/disk"
import Code from "./screens/code"
import Help from "./screens/help"

import store from "./store"

import {
  keyboardDidHide,
  keyboardDidShow,
  keyboardWillHide,
  keyboardWillShow,
} from "@itsy.studio/studio/store/keyboard"

import { resizeScreen } from "@itsy.studio/studio/store/screen"

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
  const keyboardDidHideListener = React.useRef<EmitterSubscription>()
  const keyboardDidShowListener = React.useRef<EmitterSubscription>()
  const keyboardWillHideListener = React.useRef<EmitterSubscription>()
  const keyboardWillShowListener = React.useRef<EmitterSubscription>()
  const orientationChangeListener = React.useRef<any>()

  const [ready, setReady] = React.useState(false)

  const loadResourcesAsync = async (): Promise<void> => {
    return Font.loadAsync({
      "overpass-mono-regular": require("./assets/fonts/overpass-mono-regular.ttf"),
      "overpass-mono-bold": require("./assets/fonts/overpass-mono-bold.ttf"),
    })
  }

  React.useEffect(() => {
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardDidHide",
      (event) => store.dispatch(keyboardDidHide(event))
    )
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardDidShow",
      (event) => store.dispatch(keyboardDidShow(event))
    )
    keyboardWillHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      (event) => store.dispatch(keyboardWillHide(event))
    )
    keyboardWillShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      (event) => store.dispatch(keyboardWillShow(event))
    )
    return () => {
      keyboardDidHideListener.current.remove()
      keyboardDidShowListener.current.remove()
      keyboardWillHideListener.current.remove()
      keyboardWillShowListener.current.remove()
    }
  }, [])

  React.useEffect(() => {
    orientationChangeListener.current = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        const size = Dimensions.get("window")
        store.dispatch(resizeScreen(size.width, size.height))
      }
    )
    return () => {
      ScreenOrientation.removeOrientationChangeListener(
        orientationChangeListener.current
      )
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
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </SafeAreaProvider>
  )
}

const useStorybook = false
export default useStorybook ? Storybook : App
