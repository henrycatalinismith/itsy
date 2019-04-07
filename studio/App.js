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
  createStackNavigator,
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
  snapshot,
  spritesheet,
} from "./defaults"

import Home from "./screens/home"
import Code from "./screens/code"

import Header from "./components/header"

import colors from "./constants/colors"

const initialState = {
  disks: {
    abc: {
      id: "abc",
      name: "example",
      created: (new Date).toISOString(),
      updated: (new Date).toISOString(),
    },
    def: {
      id: "def",
      name: "another",
      created: (new Date).toISOString(),
      updated: (new Date).toISOString(),
    },
  },
  edits: {
    uvw: {
      id: "uvw",
      diskId: "abc",
      lua: "cls(12)\nrect(32, 32, 96, 96, 8)\nfunction _draw()\n  circ(64, 64, 64, rnd(15))\nend\n",
      palette,
      snapshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABU9JREFUeAHtnVFu2zAQRJuil0kvkFv0p+f0T2+RC7THcbEB1rBlyabI3Z2hPPwRlFq7w5lHUgUc5O39dD5/03hZB34cceb/Pj7SpvX++ZlWG1H4EAAsA88MqbJXBRBvMx4BTCEwaekBZhoAro3OXOE9Jl4/M4tO10wPgBvKHLqbubzOoJ0SADfODJ0x+C0QGOdDBYAHf4TQlxD4PdscaQAwY44cvAPgV5b5wgFgWxEeUMWVYe4wABgmXxFySw+kFxAAbMKvtN23QGCfQfhSCgCS9NYQ0J+r9qgMAATd6DBH+lf59X1EZOuzVZNp1TPD5+yI9N0gU2/qDuAT0HnfH2G2h2kAaNX3h772ZJafKUdAltg1Y17lZ1lHQjgACj8PyQwIQgFQ+Hnhe+VoCMIAUPgeUf41EoIQABR+fujLDlEQDAOg8JfR1N1HQDAEgMKvC3ur0ygEQwBsidLP53GgGwCtfp6QR3aBLgAUPk/4rqQXgt0AKHy3nO/aA8FuAPimLUUjDuwCQKt/xOqaZ/fuAs0AKPyaACO67IGgGYAIYarB50DT9wEyV//f37/4XClW9PP0J6VjS24Uvx6eZUCKq8FF0Qvg6RHQQlGwJyoX5EDLu8BDABR+UBLAMs8geAgAULdaFzmwCYBWf1ECBW0e7QKbABToUgsCBwQAQQhICasAaPtHRpLTe+sYWAUgR4KqMjpwB4BWP2NMMZrWdoE7AGJaqcosDgiAWZJK0nkDgLb/JJeJyi6PgRsAiHRKSpEDAqDIaNY2AoA1mSJdFwB0/hc5TtDm+j3gAgCBLkkAOCAAAKYztRQATGkAtHwBoPMf4Dy4pb8HaAcAB4FuLwDQCYD7CwBwAOj2AgCdALi/AAAHgG4vANAJgPsLAHAA6PYCAJ0AuL8AAAeAbi8A0AmA+wsAcADo9gIAnQC4vwAAB4BuLwDQCYD7CwBwAOj2AgCdALi/AAAHgG4vANAJgPsLAHAA6PYCAJ0AuL8AAAeAbi8A0AmA+38B4F8RBmtR+0IH/FcBtAMUms7YSgAwplKoSQAUms3Y6gKA3gMY48nR5Oe/Vb8AkNNKVdkdEADsCSXrEwDJBrOXvwFA7wHscY3ruz7/rdoNAOPlVWE2BwTAbIkF670DQMdAsMNE5Zbbv0m7A4BIr6QUOLAKgHaBAueLW6ytfpOwCkCxNrUDOiAAgOYztN4EQMcAQzwxGra2f6u+CUBMa1Vhd+AhANoF2ON7ru/R6renHwJgHxAE5sKc41n4NiuKPx+P/hPqc8Ybo/rt/XQ+t5Rqoamljj5T40BrXk+PgBq56oJyoBkAvQugItrft3X1W+VmAOzDgsBc4B57wreZ7AKAe+pS1+PAbgC0C/TYXPPM3tVvqnYDYA8JAnOBa/SEbzPoAsAeFATmAsfoDd/UdwPAMXWpGHVgCADtAqP2jz8/svqt+xAAVkAQmAuYMRq+qR4GwIoIAnOhdkSEb4pDALBCgsBcqBlR4ZvaMACsmCAwF3JHZPimNBQAKygIzIWcER2+qQwHwIoKAnMhdmSEbwqbvw/QMx0TbcOA0OhzINvDVAB8yln0ev2jXit8SzkCloHoSFg68vy+InxTUbID+HSztzPvM/O12qNSADyYKrq93yxXhC8QACyQatKZIUB6AQPAA0FO3jWgrgxzhwPg5psZr/TfRZb50gBgIDCsCAcy68o2RyoA3HQ3ye6PsCswz4cSAAfBrm7ejCDMoJ0eAIfBzbR7Zhhm0em+TgOAC7brtcl2jwSCSYt5sXdMCcBykpUhVPZazjPj/hAALI1ZhrT895F75G4zonvr2f/Rcg1YS4QmlgAAAABJRU5ErkJggg==",
      spritesheet,
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
      snapshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA9VJREFUeAHtnUFuWkEQRE2Ufba5/+myzQkcxnLL8Be2A01TNfWQ7AFheqqr3vQnsWROLy8vr+cvbqEO/Ajtm7bfHQCAcBQAAADCHQhvnwkAAOEOhLfPBACAcAfC22cCAEC4A+HtMwEAINyB8PaZAAAQ7kB4+0wAAAh3ILx9JgAAhDsQ3j4TAADCHQhvnwkAAOEOhLfPBACAcAfC22cCAEC4A+HtMwEAINyB8PaZAAAQ7kB4+0wAAAh3ILz9nwn9v/79c3Obp1+/b36twwu3BOAY+D0hdtZSBOJ0FrXNn4ipsO4J/KuQJvb4SkPn81sA8IxQnrFnZ/BVyxoAhRAUNFSYt6y2ACzjHznq/9dMNT3f1W/5/wCKZi8Yaxp813yFn7OaAGWw0sk/huig8VKzDQCKp/7SyON9F70WlwAXMy8hcLkkyAPgGH6B4ACBPABlJutjHJAGwPn0V1zqU0AWgB3Cd4BAEoCdwleHQBKAMo318Q7IAbDj6a8YFd8PyAFQZrHOOCAFwM6nv+JUmwJSAJRJrHMOyACQcPorVqUpIANAmcM66wAAzPottxsAyEUyK0gCgKTrf8Wr8j5AAoAyhXXeAQCY91xqRwCQimNeDADMey61IwBIxTEvBgDmPZfaEQCk4pgXAwDznkvtCABSccyLAYB5z6V2BACpOObFAMC851I7AoBUHPNiAGDec6kdJQBQ+dXoZDIqvwKXAGDSePa6dgAArv2IewQAcZFfNywDQNL7AJXr/0JBBoBrLnk05YAUAAlTQOn0L8ikAJiinn0+HJADYOcpoHb6FwZyAHywyb0JByQB2HEKKJ7+BZgkAEvYThCohi8NwC4QKIcvD8ASyO2xDsheAqpt50uB+ulfHssDsEQ6QuAQ/pu35282Hxq1TH0TLfxRbg4a30x8/2bzeQGXolVPl6quS++O9y0uAUfRipcEx/CXr5YToIBQGLcKGsqPW1ZrAKrhZ4TwjD2r3851CwDKkIlQJvaofibWrQAowyqkerzeM9x666x1q4ZHvm5LAI6GHUM8Pv/Z43vg+ayuynMRAKiYrajD8p+Bika6agIA1+SadANAk5GuZQDANbkm3QDQZKRrGQBwTa5JNwA0GelaBgBck2vSDQBNRrqWAQDX5Jp0A0CTka5lAMA1uSbdANBkpGsZAHBNrkk3ADQZ6VoGAFyTa9INAE1GupYBANfkmnQDQJORrmUAwDW5Jt0A0GSkaxkAcE2uSTcANBnpWgYAXJNr0g0ATUa6lgEA1+SadANAk5GuZQDANbkm3QDQZKRrGQBwTa5JNwA0Gela5h8MC9vnLljA5AAAAABJRU5ErkJggg==",
      spritesheet,
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

const routes = {
  Home: {
    screen: Home,
  },
  Code: {
    screen: Code,
  },
}

const AppNavigator = createStackNavigator(routes)

const AppContainer = createAppContainer(AppNavigator)

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
          <AppContainer />
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
