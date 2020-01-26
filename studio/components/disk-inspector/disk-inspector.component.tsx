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
  deleteDisk,
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
  delete = "delete",
}

interface DiskInspectorProps {
  disk: Disk
  deleteDisk: (id: string) => void
  dismissDisk: (id: string) => void
  renameDisk: (id: string) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectInspectedDisk(state),
})

const mapDispatchToProps = {
  deleteDisk,
  dismissDisk,
  renameDisk,
}

export function DiskInspector({
  deleteDisk,
  disk,
  dismissDisk,
  renameDisk,
}: DiskInspectorProps) {
  const [mode, setMode] = React.useState<DiskInspectorMode>(
    DiskInspectorMode.neutral
  )
  const [name, setName] = React.useState(disk.name)

  const onDeleteStart = React.useCallback(() => {
    setMode(DiskInspectorMode.delete)
  }, [])

  const onDeleteCancel = React.useCallback(() => {
    setMode(DiskInspectorMode.neutral)
  }, [])

  const onDeleteConfirm = React.useCallback(() => {
    deleteDisk(disk.id)
  }, [])

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
      <View style={styles.navigation}>
        <Button onPress={onDismiss}>done</Button>
      </View>

      <View style={styles.header}>
        <View style={styles.headerIconColumn}>
          <DiskIcon id={disk.id} size={128} />
        </View>
        <View style={styles.headerNameColumn}>
          {{
            [DiskInspectorMode.neutral]: () => (
              <>
                <View style={styles.headerNameOutput}>
                  <Font fontSize={24}>{disk.name}</Font>
                </View>
                <View style={styles.headerNameButtons}>
                  <View style={styles.headerNameButton}>
                    <Button onPress={onRenameStart}>rename</Button>
                  </View>
                  <View style={styles.headerNameButton}>
                    <Button onPress={onDeleteStart} theme="red">
                      delete
                    </Button>
                  </View>
                </View>
              </>
            ),

            [DiskInspectorMode.rename]: () => (
              <>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={true}
                  onChangeText={onRenameEdit}
                  onSubmitEditing={onRenameSubmit}
                  style={styles.headerNameInput}
                  textContentType="none"
                  value={name}
                />
                <View style={styles.headerNameButtons}>
                  <View style={styles.headerNameButton}>
                    <Button onPress={onRenameSubmit}>save</Button>
                  </View>
                </View>
              </>
            ),

            [DiskInspectorMode.delete]: () => (
              <>
                <View style={styles.headerNameOutput}>
                  <Font fontSize={24}>really delete?</Font>
                </View>
                <View style={styles.headerNameButtons}>
                  <View style={styles.headerNameButton}>
                    <Button onPress={onDeleteCancel}>no</Button>
                  </View>
                  <View style={styles.headerNameButton}>
                    <Button onPress={onDeleteConfirm} theme="red">
                      yes
                    </Button>
                  </View>
                </View>
              </>
            ),
          }[mode]()}
        </View>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskInspector)
