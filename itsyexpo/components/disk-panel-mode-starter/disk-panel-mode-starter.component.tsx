import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import {
  selectStarters,
  useStarter,
} from "@highvalley.systems/itsyexpo/store/starters"
import DiskPanelSubmodeCreate from "@highvalley.systems/itsyexpo/components/disk-panel-submode-create"
import React from "react"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-starter.module.scss"

interface DiskPanelModeStarterProps {
  starters: Disk[]
  useStarter: (id: string) => void
}

const mapStateToProps = (state) => ({
  starters: selectStarters(state),
})

const mapDispatchToProps = {
  useStarter,
}

export function DiskPanelModeStarter({
  starters,
  useStarter,
}: DiskPanelModeStarterProps) {
  const onSelect = React.useCallback((starter: Disk) => {
    useStarter(starter.id)
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
)(DiskPanelModeStarter)
