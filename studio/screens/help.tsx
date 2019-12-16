import { Asset } from "expo-asset"
import React from "react"

import {
  StyleSheet,
  WebView,
  View,
} from "react-native"

import { connect } from "react-redux"

import colors from "@itsy.studio/palettes/pico8/original.es6"

import Frame from "@itsy.studio/studio/components/frame"
import Header from "@itsy.studio/studio/components/header"

const manual = Asset.fromModule(require("../assets/webviews/manual.html"))

const mapStateToProps = state => ({
  // asset: select.assets.from(state).forHelpScreen(),
})

const mapDispatchToProps = dispatch => ({
  // onNew: () => dispatch(thunks.new()),
  // open: diskId => dispatch(actions.open(diskId)),
});

export function HelpScreen({ navigation }) {
  return (
    <Frame>
      <View style={styles.container}>
        <WebView
          bounces={false}
          originWhitelist={["*"]}
          scrollEnabled={true}
          source={{ uri: manual.uri }}
          style={styles.webView}
          useWebKit
        />
      </View>
    </Frame>
  )
}

HelpScreen.navigationOptions = {
  header: Header
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors[14],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },

  frame1: {
    flex: 1,
    display: "flex",
    borderRightColor: colors[14],
    borderBottomColor: colors[14],
    borderLeftColor: colors[14],
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },

  frame2: {
    flex: 1,
    display: "flex",
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },

  container: {
    flex: 10,
    display: "flex",
    backgroundColor: colors[7],
  },

  webView: {
    flex: 10,
    borderColor: colors[14],
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)
