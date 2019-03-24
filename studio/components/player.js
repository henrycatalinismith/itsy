import React from "react"

import {
  StyleSheet,
  Text,
  WebView,
  View,
} from "react-native"

import colors from "../constants/colors"

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
      </View>
      <View style={styles.screen}>
        <WebView
          bounces={false}
          scrollEnabled={false}
          source={{ html: `
            <h1>player</h1>
            <style type="text/css">
              html {
                background-color: ${colors[0]};
              }
            </style>
          ` }}
          //injectedJavaScript={itsy}
          //mediaPlaybackRequiresUserAction={false}
          //onMessage={handleMessage}
          //style={styles.webView}
          //useWebKit
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  controls: {
    height: 32,
    backgroundColor: colors[13],
    borderBottomColor: colors[1],
    borderBottomWidth: 2,
  },
  screen: {
    flex: 1,
    backgroundColor: colors[0],
    borderTopColor: colors[1],
    borderRightColor: colors[1],
    borderBottomColor: colors[1],
    borderLeftColor: colors[1],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  }
})

