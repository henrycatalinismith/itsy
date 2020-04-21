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

  const onTemplate = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Template)
  }, [])

  return (
    <DiskPanelSubmodeCreate style={styles.component}>
      <View style={styles.buttons}>
        <View style={styles.blank}>
          <Button
            onPress={onBlank}
            size={ButtonSizes.Large}
            theme={ButtonThemes.Blue}
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

        <View style={styles.template}>
          <Button
            onPress={onTemplate}
            size={ButtonSizes.Large}
            theme={ButtonThemes.Gray}
          >
            template
          </Button>
        </View>
      </View>
    </DiskPanelSubmodeCreate>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeCreate)
