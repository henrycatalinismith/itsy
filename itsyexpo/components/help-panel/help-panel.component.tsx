import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import { Asset } from "expo-asset"
import React from "react"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import styles from "./help-panel.module.scss"

const manual = Asset.fromModule(require("../../assets/webviews/itsyhelp.html"))

interface HelpPanelProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function HelpPanel({}: HelpPanelProps) {
  const layout: Rect = React.useContext(LayoutContext)
  const panelWidth = {
    width: layout.width,
  }

  return (
    <WebView
      bounces={false}
      originWhitelist={["*"]}
      scrollEnabled={true}
      source={{ uri: manual.uri }}
      style={[styles.component, panelWidth]}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpPanel)
