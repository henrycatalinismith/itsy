import DiskPanelModeInspectHeader from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-header"
import DiskPanelModeInspectToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-toolbar"
import DiskPanelModeBrowse from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse"
import DiskPanelModeDelete from "@highvalley.systems/itsyexpo/components/disk-panel-mode-delete"
import DiskPanelModeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect"
import DiskPanelModeRename from "@highvalley.systems/itsyexpo/components/disk-panel-mode-rename"
import DiskPanelModeShare from "@highvalley.systems/itsyexpo/components/disk-panel-mode-share"
import DiskPanelModeSprite from "@highvalley.systems/itsyexpo/components/disk-panel-mode-sprite"
import {
  DiskPanelModes,
  selectDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel.module.scss"

interface DiskPanelProps {
  mode: DiskPanelModes
}

const mapStateToProps = (state) => ({
  mode: selectDiskPanelMode(state),
})

const mapDispatchToProps = {}

export function DiskPanel({ mode }: DiskPanelProps) {
  switch (mode) {
    case DiskPanelModes.Browse:
      return <DiskPanelModeBrowse />

    default:
      return (
        <View style={styles.inspect}>
          <DiskPanelModeInspectToolbar />
          <DiskPanelModeInspectHeader />
          {mode === DiskPanelModes.Delete && <DiskPanelModeDelete />}
          {mode === DiskPanelModes.Inspect && <DiskPanelModeInspect />}
          {mode === DiskPanelModes.Rename && <DiskPanelModeRename />}
          {mode === DiskPanelModes.Share && <DiskPanelModeShare />}
          {mode === DiskPanelModes.Sprite && <DiskPanelModeSprite />}
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanel)
