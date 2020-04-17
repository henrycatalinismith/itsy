import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmodeCreate from "@highvalley.systems/itsyexpo/components/disk-panel-submode-create"
import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-import.module.scss"

interface DiskPanelModeImportProps {
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  // disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  setDiskPanelMode,
}

export function DiskPanelModeImport({
  setDiskPanelMode,
}: DiskPanelModeImportProps) {
  const onCancel = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Browse)
  }, [])

  return (
    <DiskPanelSubmodeCreate style={styles.component}>
      <Font fontSize={24}>importing</Font>
      <Button onPress={onCancel} theme={ButtonThemes.Gray}>
        cancel
      </Button>
    </DiskPanelSubmodeCreate>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeImport)
