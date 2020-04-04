import { Asset } from "expo-asset"
import React from "react"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import styles from "./code-panel-webview.module.scss"
import {
  Disk,
  editDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"

interface EditorProps {
  disk: Disk
  editDisk: (lua: string) => void
  onLoad: () => void
}

const html = Asset.fromModule(require("../../assets/webviews/itsycode.html"))

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  editDisk,
}

export function Editor({ disk, editDisk, onLoad }: EditorProps) {
  const renders = React.useRef(0)
  const lua = disk.lua
  const webview = React.useRef() as any

  const handleMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data)
    console.log(`🏓 ${message.type}`)
    switch (message.type) {
      case "webview/start":
        setTimeout(() => {
          // wait a second while the lua gets injected
          onLoad()
        }, Math.pow(2, 8))

        webview.current.injectJavaScript(`
          const action = text.actions.change(${JSON.stringify(lua)})
          action.__fromWebview = true
          store.dispatch(action)
        `)
        break

      case "text/change":
        // console.log(lua)
        // console.log(message.lua)
        if (message.payload === lua) {
          //console.log("SAME LOLOLOLOL")
        } else {
          editDisk(message.payload)
        }
        return

      default:
        return // console.log(`🤷‍♀️ ${message.type}`)
    }
  }

  renders.current += 1

  return React.useMemo(
    () => (
      <WebView
        style={styles.webview}
        bounces={false}
        injectedJavaScript="window.isReactNative = true;"
        onMessage={handleMessage}
        ref={webview}
        scrollEnabled={false}
        source={{ uri: html.uri }}
      />
    ),
    []
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
