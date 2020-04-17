import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmodeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-submode-inspect"
import {
  deleteDisk,
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-delete.module.scss"

interface DiskPanelModeDeleteProps {
  deleteDisk: (id: string) => void
  disk: Disk
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  deleteDisk,
  setDiskPanelMode,
}

export function DiskPanelModeDelete({
  deleteDisk,
  disk,
  setDiskPanelMode,
}: DiskPanelModeDeleteProps) {
  const onCancel = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Inspect)
  }, [])

  const onConfirm = React.useCallback(() => {
    deleteDisk(disk.id)
  }, [])

  return (
    <DiskPanelSubmodeInspect title="delete" style={styles.component}>
      <View style={styles.buttons}>
        <View style={styles.delete}>
          <Button onPress={onConfirm} theme={ButtonThemes.Red}>
            delete
          </Button>
        </View>
        <View style={styles.cancel}>
          <Button onPress={onCancel}>cancel</Button>
        </View>
      </View>
    </DiskPanelSubmodeInspect>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeDelete)
