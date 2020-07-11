import "react-native-gesture-handler"
import { AppLoading } from "expo"
import * as ScreenOrientation from "expo-screen-orientation"
import * as Font from "expo-font"
import React from "react"
import { EmitterSubscription, Keyboard, Dimensions } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"

import Code from "./screens/code"
import Disk from "./screens/disk"
import Home from "./screens/home"

import store from "./store"

import { loadDisks } from "@highvalley.systems/itsyexpo/store/disks"
import { importStarters } from "@highvalley.systems/itsyexpo/store/starters"

import {
  keyboardDidHide,
  keyboardDidShow,
  keyboardWillHide,
  keyboardWillShow,
} from "@highvalley.systems/itsyexpo/store/keyboard"

import { resizeScreen } from "@highvalley.systems/itsyexpo/store/screen"

const Stack = createStackNavigator()
const AppNavigator = createStackNavigator()

function App({ skipLoadingScreen }): React.ReactElement {
  const keyboardDidHideListener = React.useRef<EmitterSubscription>()
  const keyboardDidShowListener = React.useRef<EmitterSubscription>()
  const keyboardWillHideListener = React.useRef<EmitterSubscription>()
  const keyboardWillShowListener = React.useRef<EmitterSubscription>()
  const orientationChangeListener = React.useRef<any>()

  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    store.dispatch(loadDisks())
    store.dispatch(importStarters())
  }, [])

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
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Code" component={Code} />
            <Stack.Screen name="Disk" component={Disk} />
          </Stack.Navigator>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

export default App
