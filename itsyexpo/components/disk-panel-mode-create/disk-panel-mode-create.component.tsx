import Button, {
  ButtonSizes,
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmodeCreate from "@highvalley.systems/itsyexpo/components/disk-panel-submode-create"
import Font from "@highvalley.systems/itsyexpo/components/font"
import { createDisk } from "@highvalley.systems/itsyexpo/store/disks"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-create.module.scss"

interface DiskPanelModeCreateProps {
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  // disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  createDisk,
  setDiskPanelMode,
}

export function DiskPanelModeCreate({
  setDiskPanelMode,
}: DiskPanelModeCreateProps) {
  const onBlank = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Blank)
  }, [])

  const onImport = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Import)
  }, [])

  const onStarter = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Starter)
  }, [])

  return (
    <DiskPanelSubmodeCreate style={styles.component}>
      <View style={styles.buttons}>
        <View style={styles.template}>
          <Button
            onPress={onStarter}
            size={ButtonSizes.Large}
            theme={ButtonThemes.Blue}
          >
            quick start
          </Button>
        </View>

        <View style={styles.blank}>
          <Button
            onPress={onBlank}
            size={ButtonSizes.Large}
            theme={ButtonThemes.Gray}
          >
            blank
          </Button>
        </View>

        <View style={styles.import}>
          <Button
            onPress={onImport}
            size={ButtonSizes.Large}
            theme={ButtonThemes.Gray}
          >
            import
          </Button>
        </View>
      </View>
    </DiskPanelSubmodeCreate>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeCreate)
