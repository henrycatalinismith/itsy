import Button from "@highvalley.systems/itsyexpo/components/button"
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
}

const mapStateToProps = (state, { id }) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  renameDisk,
}

export function DiskPanelModeRename({
  disk,
  renameDisk,
}: DiskPanelModeRenameProps) {
  const [name, setName] = React.useState(disk.name)

  const onChange = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onSubmit = React.useCallback(() => {
    renameDisk(name)
  }, [name])

  return (
    <View style={styles.component}>
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
      <View style={styles.button}>
        <Button onPress={onSubmit}>save</Button>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeRename)
