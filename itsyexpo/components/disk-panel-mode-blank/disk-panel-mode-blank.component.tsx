import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmodeCreate from "@highvalley.systems/itsyexpo/components/disk-panel-submode-create"
import Font from "@highvalley.systems/itsyexpo/components/font"
import { createBlankDisk } from "@highvalley.systems/itsyexpo/store/disks"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import words from "@highvalley.systems/itsyexpo/words"
import React from "react"
import { TextInput, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-blank.module.scss"

interface DiskPanelModeBlankProps {
  createBlankDisk: (name: string) => void
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  // disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  createBlankDisk,
  setDiskPanelMode,
}

export function DiskPanelModeBlank({
  createBlankDisk,
  setDiskPanelMode,
}: DiskPanelModeBlankProps) {
  const [name, setName] = React.useState(words())

  const onChange = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onCancel = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Browse)
  }, [])

  const onSubmit = React.useCallback(() => {
    createBlankDisk(name)
  }, [name])

  return (
    <DiskPanelSubmodeCreate style={styles.component}>
      <Font fontSize={24}>name</Font>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={styles.input}
        textContentType="none"
        value={name}
      />
      <View style={styles.buttons}>
        <View style={styles.save}>
          <Button onPress={onSubmit} theme={ButtonThemes.Blue}>
            create
          </Button>
        </View>
      </View>
    </DiskPanelSubmodeCreate>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeBlank)
