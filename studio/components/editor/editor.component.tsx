import { Asset } from "expo-asset"
import React from "react"
import { WebView, View } from "react-native"

import styles from "./editor.module.scss"

const html = Asset.fromModule(require("../../assets/webviews/editor.html"))

export function Editor({
  lua = "",
  onChange = (lua: string): void => {},
}) {
  const webview = React.useRef() as any

  const handleMessage = event => {
    const message = JSON.parse(event.nativeEvent.data)
    console.log(`🏓 ${message.type}`)
    switch (message.type) {
      case "ready":
        webview.current.postMessage(JSON.stringify({
          type: "inject",
          lua,
        }))
        break

      case "change":
        // console.log(lua)
        // console.log(message.lua)
        if (message.lua === lua) {
          //console.log("SAME LOLOLOLOL")
        } else {
          onChange(message.lua)
        }
        return

      default: return // console.log(`🤷‍♀️ ${message.type}`)
    }
  }

  return React.useMemo(() => (
    <View style={styles.editor}>
      <WebView
        bounces={false}
        injectedJavaScript="window.isReactNative = true;"
        onMessage={handleMessage}
        ref={webview}
        scrollEnabled={false}
        source={{ uri: html.uri }}
        useWebKit
      />
    </View>
  ), [])
}

export default Editor

