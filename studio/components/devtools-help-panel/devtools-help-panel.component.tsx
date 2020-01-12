import { Asset } from "expo-asset"
import React from "react"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import DevtoolsPanel from "@itsy.studio/studio/components/devtools-panel"
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
    <DevtoolsPanel width={screen.width}>
      <WebView
        bounces={false}
        originWhitelist={["*"]}
        scrollEnabled={true}
        source={{ uri: manual.uri }}
        style={[styles.webView, panelWidth]}
      />
    </DevtoolsPanel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsHelpPanel)