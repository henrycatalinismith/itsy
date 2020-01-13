import { Asset } from "expo-asset"
import React from "react"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import Panel from "@itsy.studio/studio/components/panel"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "./help-panel.module.scss"

const manual = Asset.fromModule(require("../../assets/webviews/manual.html"))

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
    <Panel>
      <WebView
        bounces={false}
        originWhitelist={["*"]}
        scrollEnabled={true}
        source={{ uri: manual.uri }}
        style={[styles.webView, panelWidth]}
      />
    </Panel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpPanel)
