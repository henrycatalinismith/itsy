import { Asset } from "expo-asset"
import React from "react"
import { WebView, View } from "react-native"
import { connect } from "react-redux"

import styles from "@itsy.studio/studio/components/editor/editor.module.scss"
import disks, { Disk, activeDisk } from "@itsy.studio/studio/store/disks"
import { EditorState, editorSelector } from "@itsy.studio/studio/store/editor"

interface EditorProps {
  disk: Disk
  editor: EditorState
  edit: (lua: string) => void
}

const html = Asset.fromModule(require("../../assets/webviews/editor.html"))

const mapStateToProps = state => ({
  disk: activeDisk(state),
  editor: editorSelector(state),
})

const mapDispatchToProps = {
  edit: disks.actions.edit,
}

export function Editor({
  disk,
  editor,
  edit,
}: EditorProps) {
  const lua = disk.lua
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
          edit(message.lua)
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor)

