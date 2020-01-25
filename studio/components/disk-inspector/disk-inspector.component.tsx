import React from "react"
import {
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"

import {
  Disk,
  dismissDisk,
  renameDisk,
  selectInspectedDisk,
} from "@itsy.studio/studio/store/disks"

import Button from "@itsy.studio/studio/components/button"
import DiskIcon from "@itsy.studio/studio/components/disk-icon"
import Font from "@itsy.studio/studio/components/font"
import styles from "./disk-inspector.module.scss"

enum DiskInspectorMode {
  neutral = "neutral",
  rename = "rename",
}

interface DiskInspectorProps {
  disk: Disk
  dismissDisk: (id: string) => void
  renameDisk: (id: string) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectInspectedDisk(state),
})

const mapDispatchToProps = {
  dismissDisk,
  renameDisk,
}

export function DiskInspector({
  disk,
  dismissDisk,
  renameDisk,
}: DiskInspectorProps) {
  const [mode, setMode] = React.useState<DiskInspectorMode>(
    DiskInspectorMode.neutral
  )
  const [name, setName] = React.useState(disk.name)

  const onDismiss = React.useCallback(() => {
    dismissDisk(disk.id)
  }, [])

  const onRenameStart = React.useCallback(() => {
    setMode(DiskInspectorMode.rename)
  }, [])

  const onRenameEdit = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onRenameSubmit = React.useCallback(() => {
    renameDisk(name)
    setMode(DiskInspectorMode.neutral)
  }, [name])

  return (
    <View style={styles.diskInspector}>
      <DiskIcon id={disk.id} size={128} />

      {{
        [DiskInspectorMode.neutral]: () => (
          <TouchableOpacity onPress={onRenameStart}>
            <Font fontSize={20}>{disk.name}</Font>
          </TouchableOpacity>
        ),

        [DiskInspectorMode.rename]: () => (
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            onChangeText={onRenameEdit}
            onSubmitEditing={onRenameSubmit}
            style={styles.rename}
            textContentType="none"
            value={name}
          />
        ),
      }[mode]()}

      <Button onPress={onDismiss}>done</Button>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskInspector)
