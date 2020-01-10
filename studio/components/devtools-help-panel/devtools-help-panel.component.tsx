import { Asset } from "expo-asset"
import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import Loading from "@itsy.studio/studio/components/loading"
import Player from "@itsy.studio/studio/components/player"
import Snapshot from "@itsy.studio/studio/components/snapshot"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "@itsy.studio/studio/components/devtools-play-panel/devtools-play-panel.module.scss"

const manual = Asset.fromModule(require("../../assets/webviews/manual.html"))

interface DevtoolsHelpPanelProps {
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function DevtoolsHelpPanel({ screen }: DevtoolsHelpPanelProps) {
  const panelWidth = {
    width: screen.width,
  }

  return (
    <WebView
      bounces={false}
      originWhitelist={["*"]}
      scrollEnabled={true}
      source={{ uri: manual.uri }}
      style={[styles.webView, panelWidth]}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsHelpPanel)
