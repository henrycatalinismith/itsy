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
      <WebView
        bounces={false}
        scrollEnabled={false}
        source={{ html: `<h1>player</h1>` }}
        //injectedJavaScript={itsy}
        //mediaPlaybackRequiresUserAction={false}
        //onMessage={handleMessage}
        //style={styles.webView}
        //useWebKit
      />
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
})

