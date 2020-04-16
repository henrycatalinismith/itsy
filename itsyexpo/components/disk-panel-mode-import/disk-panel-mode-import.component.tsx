import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { View } from "react-native"
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
    <View style={styles.component}>
      <Font fontSize={24}>importing</Font>
      <Button onPress={onCancel} theme={ButtonThemes.Gray}>
        cancel
      </Button>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeImport)
