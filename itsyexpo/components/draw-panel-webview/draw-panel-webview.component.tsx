import Loading from "@highvalley.systems/itsyexpo/components/loading"
import {
  Disk,
  selectActiveDisk,
  updateSpritesheet,
} from "@highvalley.systems/itsyexpo/store/disks"
import { Asset } from "expo-asset"
import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import styles from "./draw-panel-webview.module.scss"

interface DrawPanelWebviewProps {
  disk: Disk
  onLoad: () => void
  updateSpritesheet: (png: string) => void
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const html = Asset.fromModule(require("../../assets/webviews/itsydraw.html"))

const mapDispatchToProps = {
  updateSpritesheet,
}

export function DrawPanelWebview({
  disk,
  onLoad,
  updateSpritesheet,
}: DrawPanelWebviewProps) {
  const webview = React.useRef() as any

  const handleMessage = React.useCallback(
    (event) => {
      const message = JSON.parse(event.nativeEvent.data)
      console.log(`🏓 ${message.type}`)

      switch (message.type) {
        case "webview/start":
          setTimeout(() => {
            // wait a second while the lua gets injected
            onLoad()
          }, Math.pow(2, 8))

          webview.current.injectJavaScript(`
          console.log('test')
          try {
          window.store.dispatch(window.importSpritesheet(
            "${disk.spritesheet}",
            "${disk.palette}"
          ))
          } catch (e) {
            console.log(e.message)
          }
        `)
          break

        case "console/log":
          console.log(message.payload)
          break

        case "spritesheet/update":
          console.log(message.payload)
          console.log(message.uri)
          updateSpritesheet(message.uri)
          break
      }
    },
    [disk.id]
  )

  const onError = React.useCallback(() => {
    console.log("onError")
  }, [])

  return React.useMemo(
    () => (
      <WebView
        style={styles.webview}
        bounces={false}
        onMessage={handleMessage}
        onError={onError}
        ref={webview}
        scrollEnabled={false}
        source={{ uri: html.uri }}
      />
    ),
    []
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanelWebview)
