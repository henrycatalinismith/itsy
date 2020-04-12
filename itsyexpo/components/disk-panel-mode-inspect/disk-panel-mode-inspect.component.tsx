import DiskPanelModeInspectActions from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-actions"
import DiskPanelModeInspectHeader from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-header"
import DiskPanelModeInspectToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-toolbar"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-inspect.module.scss"

interface DiskPanelModeInspectProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function DiskPanelModeInspect({}: DiskPanelModeInspectProps) {
  return (
    <View style={styles.component}>
      <DiskPanelModeInspectToolbar />
      <DiskPanelModeInspectHeader />
      <DiskPanelModeInspectActions />
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeInspect)
