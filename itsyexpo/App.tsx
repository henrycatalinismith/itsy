import "react-native-gesture-handler"
import { AppLoading } from "expo"
import * as Font from "expo-font"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { Provider } from "react-redux"

import Back from "@highvalley.systems/itsyexpo/components/back"
import Pixlflip from "@highvalley.systems/itsyexpo/components/font"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"

import Devtools from "@highvalley.systems/itsyexpo/screens/devtools"
import Disk from "@highvalley.systems/itsyexpo/screens/disk"
import Home from "@highvalley.systems/itsyexpo/screens/home"
import New from "@highvalley.systems/itsyexpo/screens/new"
import Rename from "@highvalley.systems/itsyexpo/screens/rename"
import Delete from "@highvalley.systems/itsyexpo/screens/delete"

import store from "./store"
import colors from "@highvalley.systems/palettes/fantasy8"

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

  const navigator = {
    headerMode: "screen",
    screenOptions: {
      headerStyle: {
        backgroundColor: colors[14],
      },
    },
  }

  const pixlflipHeader = (title: string) => ({
    options: {
      headerTitle: (props) => {
        return <Pixlflip fontSize={24}>{title}</Pixlflip>
      },
    },
  })

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <Stack.Navigator {...navigator}>
            <Stack.Screen
              name="Home"
              component={Home}
              {...pixlflipHeader("itsy studio")}
            />

            <Stack.Screen
              name="Devtools"
              component={Devtools}
              options={({ navigation, route }) => ({
                headerLeft: (props) => <Back onPress={props.onPress} />,
                headerTitle: (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Disk", route.params)}
                  >
                    <Pixlflip fontSize={24}>
                      {store.getState().disks[route.params.id].name}
                    </Pixlflip>
                  </TouchableOpacity>
                ),
              })}
            />

            <Stack.Screen
              name="Disk"
              component={Disk}
              options={({ route }) => ({
                headerLeft: (props) => <Back onPress={props.onPress} />,
                headerTitle: <Pixlflip fontSize={24}>disk</Pixlflip>,
              })}
            />

            <Stack.Screen
              name="New"
              component={New}
              options={({ route }) => ({
                headerLeft: (props) => <Back onPress={props.onPress} />,
                headerTitle: <Pixlflip fontSize={24}>new disk</Pixlflip>,
              })}
            />

            <Stack.Screen
              name="Rename"
              component={Rename}
              options={({ route }) => ({
                headerLeft: (props) => <Back onPress={props.onPress} />,
                headerTitle: <Pixlflip fontSize={24}>rename</Pixlflip>,
              })}
            />

            <Stack.Screen
              name="Delete"
              component={Delete}
              options={({ route }) => ({
                headerLeft: (props) => <Back onPress={props.onPress} />,
                headerTitle: <Pixlflip fontSize={24}>delete</Pixlflip>,
              })}
            />
          </Stack.Navigator>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

export default App
