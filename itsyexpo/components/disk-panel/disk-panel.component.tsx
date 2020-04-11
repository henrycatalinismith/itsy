import DiskPanelBrowser from "@highvalley.systems/itsyexpo/components/disk-panel-browser"
import DiskPanelInspector from "@highvalley.systems/itsyexpo/components/disk-panel-inspector"
import {
  Disk,
  DiskTypes,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { connect } from "react-redux"

interface DiskPanelProps {
  disk: Disk
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {}

export function DiskPanel({ disk }: DiskPanelProps) {
  return (
    <>
      {disk.type !== DiskTypes.Empty ? (
        <DiskPanelInspector />
      ) : (
        <DiskPanelBrowser />
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanel)
