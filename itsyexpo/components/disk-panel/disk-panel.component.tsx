import DiskPanelModeBrowse from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse"
import DiskPanelModeDelete from "@highvalley.systems/itsyexpo/components/disk-panel-mode-delete"
import DiskPanelModeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect"
import DiskPanelModeRename from "@highvalley.systems/itsyexpo/components/disk-panel-mode-rename"
import DiskPanelModeSprite from "@highvalley.systems/itsyexpo/components/disk-panel-mode-sprite"
import {
  DiskPanelModes,
  selectDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import React from "react"
import { connect } from "react-redux"

interface DiskPanelProps {
  mode: DiskPanelModes
}

const mapStateToProps = (state) => ({
  mode: selectDiskPanelMode(state),
})

const mapDispatchToProps = {}

export function DiskPanel({ mode }: DiskPanelProps) {
  return (
    <>
      {mode === DiskPanelModes.Browse && <DiskPanelModeBrowse />}
      {mode === DiskPanelModes.Delete && <DiskPanelModeDelete />}
      {mode === DiskPanelModes.Inspect && <DiskPanelModeInspect />}
      {mode === DiskPanelModes.Rename && <DiskPanelModeRename />}
      {mode === DiskPanelModes.Sprite && <DiskPanelModeSprite />}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanel)
