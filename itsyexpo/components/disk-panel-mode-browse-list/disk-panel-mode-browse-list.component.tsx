import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import {
  Disk,
  selectDisksForBrowsePanel,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-browse-list.module.scss"

interface DiskPanelModeBrowseListProps {
  disks: Disk[]
  openDisk: (id: string) => void
}

const mapStateToProps = (state, { id }) => ({
  disks: selectDisksForBrowsePanel(state),
})

const mapDispatchToProps = {
  openDisk,
}

export function DiskPanelModeBrowseList({
  disks,
  openDisk,
}: DiskPanelModeBrowseListProps) {
  const onSelect = React.useCallback((disk: Disk) => {
    openDisk(disk.id)
  }, [])

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
