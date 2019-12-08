import React from "react"
import { View } from "react-native"
import WebView from "rn-webview"

import styles from "./editor.module.scss"

export function Editor({
  lua = "",
  onChange = (lua: string): void => {},
  sourceUri = "",
}) {
  const webview = React.useRef() as any

  const handleMessage = event => {
    const message = JSON.parse(event.nativeEvent.data)
    console.log(`🏓 ${message.type}`)
    switch (message.type) {
      case "ready":
        console.log(message)
        return
        webview.postMessage(JSON.stringify({
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
    <View style={styles.code}>
      <WebView
        bounces={false}
        injectedJavaScript="window.isReactNative = true;"
        onMessage={handleMessage}
        ref={webview}
        scrollEnabled={false}
        source={{ uri: sourceUri }}
        useWebKit
      />
    </View>
  ), [])
}

export default Editor

