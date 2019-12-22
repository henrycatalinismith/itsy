import { Asset } from "expo-asset"
import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"

import Loading from "@itsy.studio/studio/components/loading"
import styles from "@itsy.studio/studio/components/editor/editor.module.scss"
import disks, { Disk, activeDisk } from "@itsy.studio/studio/store/disks"
import { EditorState, editorSelector } from "@itsy.studio/studio/store/editor"

interface EditorProps {
  disk: Disk
  editor: EditorState
  edit: (lua: string) => void
}

const html = Asset.fromModule(require("../../assets/webviews/editor.html"))

const mapStateToProps = (state) => ({
  disk: activeDisk(state),
  editor: editorSelector(state),
})

const mapDispatchToProps = {
  edit: disks.actions.edit,
}

export function Editor({ disk, editor, edit }: EditorProps) {
  const [loading, setLoading] = React.useState(true)
  const lua = disk.lua
  const webview = React.useRef() as any

  const handleMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data)
    console.log(`🏓 ${message.type}`)
    switch (message.type) {
      case "webview/start":
        setTimeout(() => {
          // wait a second while the lua gets injected
          setLoading(false)
        }, 100)

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
          edit(message.payload)
        }
        return

      default:
        return // console.log(`🤷‍♀️ ${message.type}`)
    }
  }

  return React.useMemo(
    () => (
      <View style={styles.editor}>
        <WebView
          style={styles.webview}
          bounces={false}
          injectedJavaScript="window.isReactNative = true;"
          onMessage={handleMessage}
          ref={webview}
          scrollEnabled={false}
          source={{ uri: html.uri }}
        />
        {loading && <Loading style={styles.loading} />}
      </View>
    ),
    [loading]
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
