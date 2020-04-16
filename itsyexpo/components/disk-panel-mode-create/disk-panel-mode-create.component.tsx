import words from "@highvalley.systems/itsyexpo/words"
import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import DiskPanelModeCreateButtonGroup from "@highvalley.systems/itsyexpo/components/disk-panel-mode-create-button-group"
import Font from "@highvalley.systems/itsyexpo/components/font"
import { createDisk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { TextInput, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-create.module.scss"

interface DiskPanelModeCreateProps {
  createDisk: (name: string) => void
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
  createDisk,
  setDiskPanelMode,
}: DiskPanelModeCreateProps) {
  const [name, setName] = React.useState(words())

  const onChange = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onCancel = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Browse)
  }, [])

  const onSubmit = React.useCallback(() => {
    createDisk(name)
  }, [name])

  const buttons = []

  buttons.push({
    label: "blank",
    action: () => {},
    active: true,
  })

  buttons.push({
    label: "import",
    action: () => {},
    active: false,
  })

  return (
    <View style={styles.component}>
      <View style={styles.buttons}>
        <DiskPanelModeCreateButtonGroup buttons={buttons} />
      </View>

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
        <View style={styles.cancel}>
          <Button onPress={onCancel} theme={ButtonThemes.Gray}>
            cancel
          </Button>
        </View>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeCreate)
