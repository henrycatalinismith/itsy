import delay from "delay"
import Webview from "@highvalley.systems/itsyexpo/components/webview"
import {
  WebviewApp,
  WebviewBridgeEvents,
} from "@highvalley.systems/itsyexpo/components/webview-bridge"
import {
  Disk,
  selectActiveDisk,
  updateSpritesheet,
} from "@highvalley.systems/itsyexpo/store/disks"
import { WebviewIds } from "@highvalley.systems/itsyexpo/store/webviews"
import { Asset } from "expo-asset"
import React from "react"
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
  const events: WebviewBridgeEvents = {}

  events["webview/start"] = async function($1, app: WebviewApp): Promise<void> {
    if (disk) {
      app.dispatch("importSpritesheet", disk.spritesheet, disk.palette)
    }
    await delay(Math.pow(2, 8))
    onLoad()
  }

  events["spritesheet/update"] = async (payload: any): Promise<void> => {
    updateSpritesheet(payload.uri)
  }

  const id = WebviewIds.draw
  const style = styles.component
  const uri = html.uri

  const props = {
    id,
    events,
    style,
    uri,
  }

  return <Webview {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanelWebview)
