import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import {
  Disk,
  selectDisksForBrowsePanel,
} from "@highvalley.systems/itsyexpo/store/disks"
import {
  DiskPanelModes,
  selectDiskPanelMode,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-browse-list.module.scss"

interface DiskPanelModeBrowseListProps {
  disks: Disk[]
  mode: DiskPanelModes
  openDisk: (id: string) => void
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  disks: selectDisksForBrowsePanel(state),
  mode: selectDiskPanelMode(state),
})

const mapDispatchToProps = {
  openDisk,
  setDiskPanelMode,
}

export function DiskPanelModeBrowseList({
  disks,
  mode,
  openDisk,
  setDiskPanelMode,
}: DiskPanelModeBrowseListProps) {
  const onMount = React.useCallback(() => {
    if (mode === DiskPanelModes.Browse && disks.length === 0) {
      // setDiskPanelMode(DiskPanelModes.Create)
    }
  }, [mode, disks])

  const onSelect = React.useCallback((disk: Disk) => {
    openDisk(disk.id)
  }, [])

  React.useEffect(onMount, [])

  return (
    <View style={styles.component}>
      <DiskPicker disks={disks} onSelect={onSelect} />
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeBrowseList)
