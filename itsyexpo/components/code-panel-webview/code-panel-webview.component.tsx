import delay from "delay"
import WebviewBridge, {
  WebviewBridgeEvents,
  WebviewBridgeProps,
} from "@highvalley.systems/itsyexpo/components/webview-bridge"
import {
  Disk,
  editDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import { Asset } from "expo-asset"
import React from "react"
import { connect } from "react-redux"
import styles from "./code-panel-webview.module.scss"

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
  const lua = disk && disk.lua

  const events: WebviewBridgeEvents = {
    "webview/start": async function($1, dispatch): Promise<void> {
      dispatch("text/change", lua)
      await delay(Math.pow(2, 8))
      onLoad()
    },

    "text/change": async (payload: any): Promise<void> => {
      if (payload !== lua) {
        editDisk(payload)
      }
    },
  }

  const id = "itsycode"
  const style = styles.component
  const uri = html.uri

  const props: WebviewBridgeProps = {
    id,
    events,
    style,
    uri,
  }

  return <WebviewBridge {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
