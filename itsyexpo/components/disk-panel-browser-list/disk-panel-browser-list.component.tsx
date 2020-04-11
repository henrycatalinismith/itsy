import DiskPanelBrowserListItem from "@highvalley.systems/itsyexpo/components/disk-panel-browser-list-item"
import {
  Disk,
  selectNormalDisks,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-browser-list.module.scss"

interface DiskPanelBrowserListProps {
  disks: Disk[]
}

const mapStateToProps = (state, { id }) => ({
  disks: selectNormalDisks(state),
})

const mapDispatchToProps = {}

export function DiskPanelBrowserList({ disks }: DiskPanelBrowserListProps) {
  return (
    <ScrollView style={styles.component}>
      {disks.map((disk) => (
        <DiskPanelBrowserListItem key={disk.id} id={disk.id} />
      ))}
    </ScrollView>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelBrowserList)
