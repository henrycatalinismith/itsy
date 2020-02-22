import { Asset } from "expo-asset"
import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"

import {
  Disk,
  editDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"

import styles from "./draw-panel.module.scss"

interface DrawPanelProps {
  disk: Disk
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const html = Asset.fromModule(require("../../assets/webviews/itsydraw.html"))

const mapDispatchToProps = {}

export function DrawPanel({ disk }: DrawPanelProps) {
  const webview = React.useRef() as any

  const handleMessage = React.useCallback((event) => {
    const message = JSON.parse(event.nativeEvent.data)
    console.log(`🏓 ${message.type}`)

    switch (message.type) {
      case "webview/start":
        console.log(disk.spritesheet)
        console.log(disk.palette)
        webview.current.injectJavaScript(`
          store.dispatch(importSpriteSheet(
            "${disk.spritesheet}",
            "${disk.palette}",
          ))
        `)
        break
    }
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
