import { CompositeNavigationProp, RouteProp } from "@react-navigation/native"
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs"
import { DiskTabParamList } from "@highvalley.systems/itsyexpo/screens/disk"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import Webview from "@highvalley.systems/itsyexpo/components/webview"
import {
  WebviewApp,
  WebviewBridgeEvents,
} from "@highvalley.systems/itsyexpo/components/webview-bridge"
import { Disk, editDisk } from "@highvalley.systems/itsyexpo/store/disks"
import { WebviewIds } from "@highvalley.systems/itsyexpo/store/webviews"
import { Asset } from "expo-asset"
import React from "react"
import { connect } from "react-redux"
import styles from "./code.module.scss"

interface CodeScreenProps {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<DiskTabParamList, "Code">,
    StackNavigationProp<RootStackParamList>
  >
  route: RouteProp<DiskTabParamList, "Code">
  disk: Disk
  editDisk: (id: string, lua: string) => void
}

const html = Asset.fromModule(require("../../assets/webviews/itsycode.html"))

const mapStateToProps = (state, ownProps) => {
  return {
    disk: state.disks[ownProps.route.params.id],
  }
}

const mapDispatchToProps = {
  editDisk,
}

export function CodeScreen({
  navigation,
  route,
  disk,
  editDisk,
}: CodeScreenProps) {
  console.log("<CodeScreen /> 🐉")
  const lua = disk && disk.lua
  console.log(route)

  const events: WebviewBridgeEvents = {}

  events["webview/start"] = async function($1, app: WebviewApp): Promise<void> {
    console.log(app)
    app.dispatch("text/change", lua)
  }

  events["text/change"] = async (payload: any): Promise<void> => {
    if (payload !== lua) {
      editDisk(disk.id, payload)
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
