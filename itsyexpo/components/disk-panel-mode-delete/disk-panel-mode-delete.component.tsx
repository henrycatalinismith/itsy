import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import {
  deleteDisk,
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
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
    <View style={styles.component}>
      <View style={styles.prompt}>
        <Font fontSize={24}>really delete?</Font>
      </View>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button onPress={onCancel}>no</Button>
        </View>
        <View style={styles.button}>
          <Button onPress={onConfirm} theme={ButtonThemes.Red}>
            yes
          </Button>
        </View>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeDelete)
