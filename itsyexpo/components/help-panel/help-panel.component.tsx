import HelpPanelWebview from "@highvalley.systems/itsyexpo/components/help-panel-webview"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./help-panel.module.scss"

interface HelpPanelProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function HelpPanel({}: HelpPanelProps) {
  return (
    <View style={styles.component}>
      <HelpPanelWebview />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpPanel)
