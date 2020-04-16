import DiskPanelModeInspectHeader from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-header"
import DiskPanelModeInspectToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-toolbar"
import DiskPanelModeInspectActions from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-actions"
import DiskPanelModeInspectPanels from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-panels"
import React from "react"
import { ScrollView } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-inspect.module.scss"

interface DiskPanelModeInspectProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function DiskPanelModeInspect({}: DiskPanelModeInspectProps) {
  return (
    <ScrollView style={styles.component}>
      <DiskPanelModeInspectToolbar />
      <DiskPanelModeInspectHeader />
      <DiskPanelModeInspectPanels />
      <DiskPanelModeInspectActions />
    </ScrollView>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeInspect)
