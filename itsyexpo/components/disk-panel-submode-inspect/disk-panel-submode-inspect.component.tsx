import DiskPanelModeInspectHeader from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-header"
import DiskPanelModeInspectToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-toolbar"
import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-submode-inspect.module.scss"

interface DiskPanelSubmodeInspectProps {
  children: any
  style?: any
  title?: string
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPanelSubmodeInspect({
  children,
  style = undefined,
  title = "",
}: DiskPanelSubmodeInspectProps) {
  return (
    <View style={styles.component}>
      <DiskPanelModeInspectToolbar />
      <DiskPanelModeInspectHeader />
      {title.length > 0 && (
        <View style={styles.title}>
          <Font fontSize={24}>{title}</Font>
        </View>
      )}
      <ScrollView style={[styles.children, style]}>
        {children}
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelSubmodeInspect)
