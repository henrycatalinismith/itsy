import delay from "delay"
import WebviewBridge, {
  WebviewBridgeEvents,
  WebviewBridgeProps,
} from "@highvalley.systems/itsyexpo/components/webview-bridge"
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
  const events: WebviewBridgeEvents = {
    "webview/start": async function($1, dispatch): Promise<void> {
      if (disk) {
        dispatch("importSpritesheet", disk.spritesheet, disk.palette)
      }
      await delay(Math.pow(2, 8))
      onLoad()
    },

    "spritesheet/update": async (payload: any): Promise<void> => {
      updateSpritesheet(payload.uri)
    },
  }

  const id = "itsydraw"
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanelWebview)
