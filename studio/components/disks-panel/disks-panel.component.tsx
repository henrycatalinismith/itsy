import React from "react"
import { Text } from "react-native"
import { connect } from "react-redux"
import DiskInspector from "@itsy.studio/studio/components/disk-inspector"
import DiskList from "@itsy.studio/studio/components/disk-list"
import { Disk, selectInspectedDisk } from "@itsy.studio/studio/store/disks"
// import styles from "./disks-panel.module.scss"

interface DisksPanelProps {
  inspectedDisk: Disk
}

const mapStateToProps = (state) => ({
  inspectedDisk: selectInspectedDisk(state),
})

const mapDispatchToProps = {}

export function DisksPanel({ inspectedDisk }: DisksPanelProps) {
  return <>{inspectedDisk ? <DiskInspector /> : <DiskList />}</>
}

export default connect(mapStateToProps, mapDispatchToProps)(DisksPanel)
