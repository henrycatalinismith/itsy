import "react-native-gesture-handler"
import { AppLoading } from "expo"
import * as Font from "expo-font"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"

import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import Code from "./screens/code/code.screen"
import Disk from "./screens/disk/disk.screen"
import Home from "./screens/home/home.screen"

import store from "./store"

import { loadDisks } from "@highvalley.systems/itsyexpo/store/disks"
import { importStarters } from "@highvalley.systems/itsyexpo/store/starters"

const Stack = createStackNavigator<RootStackParamList>()

function App({ skipLoadingScreen }): React.ReactElement {
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
