import DiskPanelNameInput, {
  DiskPanelNameInputProps,
} from "@highvalley.systems/itsyexpo/components/disk-panel-name-input"
import DiskPanelSubmodeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-submode-inspect"
import {
  Disk,
  copyDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-copy.module.scss"

interface DiskPanelModeCopyProps {
  disk: Disk
  copyDisk: (name: string) => void
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  copyDisk,
  setDiskPanelMode,
}

export function DiskPanelModeCopy({
  disk,
  copyDisk,
  setDiskPanelMode,
}: DiskPanelModeCopyProps) {
  const nameInput: DiskPanelNameInputProps = {
    name: `copy of ${disk.name}`,
    onSubmit: (name) => copyDisk(name),
    onCancel: () => setDiskPanelMode(DiskPanelModes.Inspect),
  }

  return (
    <DiskPanelSubmodeInspect title="copy" style={styles.component}>
      <DiskPanelNameInput {...nameInput} />
    </DiskPanelSubmodeInspect>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeCopy)
