import { Asset } from "expo-asset"
import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import styles from "./draw-panel.module.scss"

interface DrawPanelProps {
  // screen: ScreenState
}

const mapStateToProps = (state) => ({
  // screen: selectScreen(state),
})

const html = Asset.fromModule(require("../../assets/webviews/graphics.html"))

const mapDispatchToProps = {}

export function DrawPanel({}: DrawPanelProps) {
  const webview = React.useRef() as any

  const handleMessage = React.useCallback((event) => {
    const message = JSON.parse(event.nativeEvent.data)
    console.log(`🏓 ${message.type}`)
  }, [])

  return React.useMemo(
    () => (
      <View style={styles.drawPanel}>
        <WebView
          style={styles.webview}
          bounces={false}
          injectedJavaScript="window.isReactNative = true;"
          onMessage={handleMessage}
          ref={webview}
          scrollEnabled={false}
          source={{ uri: html.uri }}
        />
      </View>
    ),
    []
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanel)
