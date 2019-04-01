import React from "react"

import {
  AppLoading,
  Asset,
  Font,
  Icon,
} from "expo"

import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native"

import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation"

import {
  Provider,
  connect,
} from "react-redux"

import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux"

import actions from "./actions"
import middlewares from "./middlewares"
import reducers from "./reducers"

import {
  palette,
  spritesheet,
  thumbnail,
} from "./defaults"

import colors from "./constants/colors"
import Footer from "./components/footer"
import Frame from "./components/frame"

const initialState = {
  disks: {
    abc: {
      id: "abc",
      name: "example",
      created: (new Date).toISOString(),
    },
    def: {
      id: "def",
      name: "another",
      created: (new Date).toISOString(),
    },
  },
  edits: {
    uvw: {
      id: "uvw",
      diskId: "abc",
      lua: "cls(12)\nrect(32, 32, 96, 96, 8)\nfunction _draw()\n  circ(64, 64, 64, rnd(15))\nend\n",
      palette,
      spritesheet,
      thumbnail,
      created: (new Date).toISOString(),
      updated: (new Date).toISOString(),
      started: undefined,
      stopped: undefined,
    },
    xyz: {
      id: "xyz",
      diskId: "def",
      lua: "circ(64, 64, 32, 7)\n",
      palette,
      spritesheet,
      thumbnail,
      created: (new Date).toISOString(),
      updated: (new Date).toISOString(),
      started: undefined,
      stopped: undefined,
    },
  },
  scalars: {
    diskId: undefined,
    ready: false,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
}

const store = createStore(reducers, initialState, middlewares)

store.dispatch(actions.start())

const AppNavigator = createAppContainer(createSwitchNavigator({
  Main: Footer,
}))

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <Frame>
            <AppNavigator />
          </Frame>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "overpass-mono-regular": require("./assets/fonts/overpass-mono-regular.ttf"),
        "overpass-mono-bold": require("./assets/fonts/overpass-mono-bold.ttf"),
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
