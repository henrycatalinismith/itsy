import { Asset } from "expo-asset"
import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"

import Loading from "@itsy.studio/studio/components/loading"
import styles from "@itsy.studio/studio/components/editor/editor.module.scss"
import {
  Disk,
  editDisk,
  selectActiveDisk,
} from "@itsy.studio/studio/store/disks"
import { EditorState, editorSelector } from "@itsy.studio/studio/store/editor"

interface EditorProps {
  disk: Disk
  editor: EditorState
  editDisk: (lua: string) => void
}

const html = Asset.fromModule(require("../../assets/webviews/itsycode.html"))

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
  editor: editorSelector(state),
})

const mapDispatchToProps = {
  editDisk,
}

export function Editor({ disk, editor, editDisk }: EditorProps) {
  const renders = React.useRef(0)
  const [loading, setLoading] = React.useState(true)
  const [reloading, setReloading] = React.useState(false)
  const lua = disk.lua
  const webview = React.useRef() as any

  React.useEffect(() => {
    if (renders.current > 1) {
      setLoading(true)
      setReloading(true)
      setTimeout(() => setReloading(false), Math.pow(2, 8))
    }
  }, [disk.id])

  const handleMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data)
    console.log(`🏓 ${message.type}`)
    switch (message.type) {
      case "webview/start":
        setTimeout(() => {
          // wait a second while the lua gets injected
          setLoading(false)
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
      <View style={styles.editor}>
        {!reloading && (
          <WebView
            style={styles.webview}
            bounces={false}
            injectedJavaScript="window.isReactNative = true;"
            onMessage={handleMessage}
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
