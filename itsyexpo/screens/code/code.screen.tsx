import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import delay from "delay"
import Webview from "@highvalley.systems/itsyexpo/components/webview"
import {
  WebviewApp,
  WebviewBridgeEvents,
} from "@highvalley.systems/itsyexpo/components/webview-bridge"
import {
  Disk,
  editDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import { WebviewIds } from "@highvalley.systems/itsyexpo/store/webviews"
import { Asset } from "expo-asset"
import React from "react"
import { connect } from "react-redux"
import styles from "./code.module.scss"

interface CodeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Code">
  disk: Disk
  editDisk: (lua: string) => void
}

const html = Asset.fromModule(require("../../assets/webviews/itsycode.html"))

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  editDisk,
}

export function CodeScreen({ disk, editDisk }: CodeScreenProps) {
  console.log("<CodeScreen /> 🐉")
  const lua = disk && disk.lua
  console.log(lua)

  const events: WebviewBridgeEvents = {}

  events["webview/start"] = async function($1, app: WebviewApp): Promise<void> {
    console.log(app)
    app.dispatch("text/change", lua)
  }

  events["text/change"] = async (payload: any): Promise<void> => {
    if (payload !== lua) {
      editDisk(payload)
    }
  }

  const id = WebviewIds.code
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

export default connect(mapStateToProps, mapDispatchToProps)(CodeScreen)
