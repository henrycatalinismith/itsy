import React from "react"

import {
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
  AppLoading,
  Asset,
  Font,
  Icon,
} from "expo"

import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux"

import actions from "./actions"
import middlewares from "./middlewares"
import reducers from "./reducers"

import colors from "./constants/colors"
import Footer from "./components/footer"
import Frame from "./components/frame"

const store = createStore(reducers, {}, middlewares)
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
        <Frame>
          <AppNavigator />
        </Frame>
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
