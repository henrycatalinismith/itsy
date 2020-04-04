import DiskPanelInspector from "@highvalley.systems/itsyexpo/components/disk-panel-inspector"
import DiskPanelList from "@highvalley.systems/itsyexpo/components/disk-panel-list"
import {
  Disk,
  selectInspectedDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { connect } from "react-redux"
// import styles from "./disks-panel.module.scss"

interface DiskPanelProps {
  inspectedDisk: Disk
}

const mapStateToProps = (state) => ({
  inspectedDisk: selectInspectedDisk(state),
})

const mapDispatchToProps = {}

export function DiskPanel({ inspectedDisk }: DiskPanelProps) {
  return <>{inspectedDisk ? <DiskPanelInspector /> : <DiskPanelList />}</>
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanel)
