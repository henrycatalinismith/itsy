import DiskPanelNameInput, {
  DiskPanelNameInputProps,
} from "@highvalley.systems/itsyexpo/components/disk-panel-name-input"
import DiskPanelSubmodeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-submode-inspect"
import {
  Disk,
  renameDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-rename.module.scss"

interface DiskPanelModeRenameProps {
  disk: Disk
  renameDisk: (id: string) => void
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  renameDisk,
  setDiskPanelMode,
}

export function DiskPanelModeRename({
  disk,
  renameDisk,
  setDiskPanelMode,
}: DiskPanelModeRenameProps) {
  const nameInput: DiskPanelNameInputProps = {
    name: disk.name,
    onSubmit: (name) => renameDisk(name),
    onCancel: () => setDiskPanelMode(DiskPanelModes.Inspect),
  }

  return (
    <DiskPanelSubmodeInspect title="rename" style={styles.component}>
      <DiskPanelNameInput {...nameInput} />
    </DiskPanelSubmodeInspect>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeRename)
