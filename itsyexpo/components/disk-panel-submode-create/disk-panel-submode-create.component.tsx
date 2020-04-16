import DiskPanelModeCreateButtonGroup from "@highvalley.systems/itsyexpo/components/disk-panel-mode-create-button-group"
import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  DiskPanelModes,
  selectDiskPanelMode,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import React from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-submode-create.module.scss"

interface DiskPanelSubmodeCreateProps {
  children: any
  mode: DiskPanelModes
  setDiskPanelMode: (mode: DiskPanelModes) => void
  style?: any
  title?: string
}

const mapStateToProps = (state) => ({
  mode: selectDiskPanelMode(state),
})

const mapDispatchToProps = {
  setDiskPanelMode,
}

export function DiskPanelSubmodeCreate({
  children,
  mode,
  setDiskPanelMode,
  style = undefined,
  title = "",
}: DiskPanelSubmodeCreateProps) {
  const buttons = []

  buttons.push({
    label: "blank",
    action: () => setDiskPanelMode(DiskPanelModes.Create),
    active: mode === DiskPanelModes.Create,
  })

  buttons.push({
    label: "import",
    action: () => setDiskPanelMode(DiskPanelModes.Import),
    active: mode === DiskPanelModes.Import,
  })

  return (
    <View style={styles.component}>
      <View style={styles.header}>
        <Font fontSize={32}>new disk</Font>
      </View>
      <ScrollView style={[styles.children, style]}>
        {children}
        <View style={styles.spacer} />
      </ScrollView>
      <View style={styles.mode}>
        <DiskPanelModeCreateButtonGroup buttons={buttons} />
      </View>
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelSubmodeCreate)
