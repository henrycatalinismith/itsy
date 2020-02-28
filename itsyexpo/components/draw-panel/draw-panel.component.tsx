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
import styles from "./draw-panel.module.scss"

interface DrawPanelProps {
  disk: Disk
  updateSpritesheet: (png: string) => void
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const html = Asset.fromModule(require("../../assets/webviews/itsydraw.html"))

const mapDispatchToProps = {
  updateSpritesheet,
}

export function DrawPanel({ disk, updateSpritesheet }: DrawPanelProps) {
  const webview = React.useRef() as any
  const renders = React.useRef(0)
  const [loading, setLoading] = React.useState(true)
  const [reloading, setReloading] = React.useState(false)

  React.useEffect(() => {
    if (renders.current > 1) {
      setLoading(true)
      setReloading(true)
      setTimeout(() => setReloading(false), Math.pow(2, 8))
    }
  }, [disk.id])

  const handleMessage = React.useCallback(
    (event) => {
      const message = JSON.parse(event.nativeEvent.data)
      console.log(`🏓 ${message.type}`)

      switch (message.type) {
        case "webview/start":
          setTimeout(() => {
            // wait a second while the lua gets injected
            setLoading(false)
          }, Math.pow(2, 8))

          // console.log(disk.spritesheet)
          // console.log(disk.palette)
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

  renders.current += 1

  const onError = React.useCallback(() => {
    console.log("onError")
  }, [])

  return React.useMemo(
    () => (
      <View style={styles.drawPanel}>
        {!reloading && (
          <WebView
            style={styles.webview}
            bounces={false}
            onMessage={handleMessage}
            onError={onError}
            ref={webview}
            scrollEnabled={false}
            source={{ uri: html.uri }}
          />
        )}
        {(loading || reloading) && <Loading style={styles.loading} />}
      </View>
    ),
    [loading, reloading]
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanel)
