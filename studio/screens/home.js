import React from "react"
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { WebBrowser } from "expo"

import Header from "../components/header"
import Frame from "../components/frame"
import { MonoText } from "../components/styled-text"
import colors from "../constants/colors"

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <>
        <Header />
        <ScrollView style={styles.container}>
          <Text>lol</Text>
        </ScrollView>
      </>
    )
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync("https://docs.expo.io/versions/latest/guides/development-mode")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors[7],
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    paddingLeft: 4,
    paddingRight: 4,
  },
})
