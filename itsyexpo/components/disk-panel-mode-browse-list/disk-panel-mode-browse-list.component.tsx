import DiskPanelModeBrowseListItem from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse-list-item"
import {
  Disk,
  selectNormalDisks,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { ScrollView } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-browse-list.module.scss"

interface DiskPanelModeBrowseListProps {
  disks: Disk[]
}

const mapStateToProps = (state, { id }) => ({
  disks: selectNormalDisks(state),
})

const mapDispatchToProps = {}

export function DiskPanelModeBrowseList({
  disks,
}: DiskPanelModeBrowseListProps) {
  return (
    <ScrollView style={styles.component}>
      {disks.map((disk) => (
        <DiskPanelModeBrowseListItem key={disk.id} id={disk.id} />
      ))}
    </ScrollView>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeBrowseList)
