import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmodeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-submode-inspect"
import {
  Disk,
  renameDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
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
    <DiskPanelSubmodeInspect title="rename" style={styles.component}>
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
          <Button action={onSubmit} theme={ButtonThemes.Blue}>
            save
          </Button>
        </View>
        <View style={styles.cancel}>
          <Button action={onCancel} theme={ButtonThemes.Gray}>
            cancel
          </Button>
        </View>
      </View>
    </DiskPanelSubmodeInspect>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeRename)
