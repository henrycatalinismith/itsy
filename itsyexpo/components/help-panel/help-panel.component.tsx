import {
  ScreenState,
  selectScreen,
} from "@highvalley.systems/itsyexpo/store/screen"
import { Asset } from "expo-asset"
import React from "react"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import styles from "./help-panel.module.scss"

const manual = Asset.fromModule(require("../../assets/webviews/itsyhelp.html"))

interface HelpPanelProps {
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function HelpPanel({ screen }: HelpPanelProps) {
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpPanel)
