import DiskPanelModeBrowse from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse"
import DiskPanelModeCreate from "@highvalley.systems/itsyexpo/components/disk-panel-mode-create"
import DiskPanelModeDelete from "@highvalley.systems/itsyexpo/components/disk-panel-mode-delete"
import DiskPanelModeImport from "@highvalley.systems/itsyexpo/components/disk-panel-mode-import"
import DiskPanelModeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect"
import DiskPanelModeRename from "@highvalley.systems/itsyexpo/components/disk-panel-mode-rename"
import DiskPanelModeShare from "@highvalley.systems/itsyexpo/components/disk-panel-mode-share"
import DiskPanelModeSprite from "@highvalley.systems/itsyexpo/components/disk-panel-mode-sprite"
import {
  DiskPanelModes,
  selectDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
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
  // always keep <DiskPanelModeBrowse /> loaded so that closing a disk isn't
  // too laggy a lot of disks are present
  return (
    <View style={styles.component}>
      <DiskPanelModeBrowse />
      {mode === DiskPanelModes.Create && <DiskPanelModeCreate />}
      {mode === DiskPanelModes.Delete && <DiskPanelModeDelete />}
      {mode === DiskPanelModes.Import && <DiskPanelModeImport />}
      {mode === DiskPanelModes.Inspect && <DiskPanelModeInspect />}
      {mode === DiskPanelModes.Rename && <DiskPanelModeRename />}
      {mode === DiskPanelModes.Share && <DiskPanelModeShare />}
      {mode === DiskPanelModes.Sprite && <DiskPanelModeSprite />}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanel)
