import React from "react"
import { Text } from "react-native"
import { connect } from "react-redux"
import DiskInspector from "@highvalley.systems/itsyexpo/components/disk-inspector"
import DiskList from "@highvalley.systems/itsyexpo/components/disk-list"
import {
  Disk,
  selectInspectedDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
// import styles from "./disks-panel.module.scss"

interface DiskPanelProps {
  inspectedDisk: Disk
}

const mapStateToProps = (state) => ({
  inspectedDisk: selectInspectedDisk(state),
})

const mapDispatchToProps = {}

export function DiskPanel({ inspectedDisk }: DiskPanelProps) {
  return <>{inspectedDisk ? <DiskInspector /> : <DiskList />}</>
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanel)
