import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import {
  Disk,
  createDiskFromStarter,
} from "@highvalley.systems/itsyexpo/store/disks"
import { selectStarters } from "@highvalley.systems/itsyexpo/store/starters"
import DiskPanelSubmodeCreate from "@highvalley.systems/itsyexpo/components/disk-panel-submode-create"
import React from "react"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-template.module.scss"

interface DiskPanelModeTemplateProps {
  starters: Disk[]
  createDiskFromStarter: (disk: Disk) => void
}

const mapStateToProps = (state) => ({
  starters: selectStarters(state),
})

const mapDispatchToProps = {
  createDiskFromStarter,
}

export function DiskPanelModeTemplate({
  starters,
}: DiskPanelModeTemplateProps) {
  const onSelect = React.useCallback((disk: Disk) => {
    console.log(createDiskFromStarter)
    createDiskFromStarter(disk)
  }, [])

  return (
    <DiskPanelSubmodeCreate
      style={styles.component}
      title="quick start"
      scrollable={false}
    >
      <DiskPicker disks={starters} onSelect={onSelect} />
    </DiskPanelSubmodeCreate>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeTemplate)
