import React from "react"

import {
  StyleSheet,
  Text,
  // WebView,
  View,
} from "react-native"

import WebView from "rn-webview"

import colors from "../constants/colors"

export default ({
  onChange,
  sourceUri,
}) => {
  const handleMessage = event => {
    const message = JSON.parse(event.nativeEvent.data)
    switch (message.type) {
      case "change": return onChange(message.value)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
      </View>
      <View style={styles.code}>
        <WebView
          bounces={false}
          onMessage={handleMessage}
          scrollEnabled={false}
          source={{ uri: sourceUri }}
          useWebKit
          //injectedJavaScript={itsy}
          //mediaPlaybackRequiresUserAction={false}
          //style={styles.webView}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    backgroundColor: colors[15],
    borderBottomColor: colors[13],
    borderBottomWidth: 2,
  },
  code: {
    flex: 1,
    borderTopColor: colors[6],
    borderTopWidth: 2,
  },
})
