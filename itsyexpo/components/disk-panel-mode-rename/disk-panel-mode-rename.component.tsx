import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmode from "@highvalley.systems/itsyexpo/components/disk-panel-submode"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import {
  Disk,
  renameDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { TextInput, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-rename.module.scss"

interface DiskPanelModeRenameProps {
  disk: Disk
  renameDisk: (id: string) => void
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  renameDisk,
  setDiskPanelMode,
}

export function DiskPanelModeRename({
  disk,
  renameDisk,
  setDiskPanelMode,
}: DiskPanelModeRenameProps) {
  const [name, setName] = React.useState(disk.name)

  const onChange = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onCancel = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Inspect)
  }, [])

  const onSubmit = React.useCallback(() => {
    renameDisk(name)
  }, [name])

  return (
    <DiskPanelSubmode title="rename">
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
            save
          </Button>
        </View>
        <View style={styles.cancel}>
          <Button onPress={onCancel} theme={ButtonThemes.Gray}>
            cancel
          </Button>
        </View>
      </View>
    </DiskPanelSubmode>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeRename)
