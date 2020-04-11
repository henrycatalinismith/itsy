import Button from "@highvalley.systems/itsyexpo/components/button"
import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import DiskPanelInspectorSpritesheet from "@highvalley.systems/itsyexpo/components/disk-panel-inspector-spritesheet"
import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  changeDiskSpritesheet,
  deleteDisk,
  Disk,
  dismissDisk,
  renameDisk,
  selectActiveDisk,
  shareDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import React from "react"
import { TextInput, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-inspector.module.scss"

enum DiskPanelInspectorModes {
  Neutral = "Neutral",
  Rename = "Rename",
  Delete = "Delete",
}

interface DiskPanelInspectorProps {
  disk: Disk
  changeDiskSpritesheet: (uri: string) => void
  deleteDisk: (id: string) => void
  dismissDisk: (id: string) => void
  renameDisk: (id: string) => void
  shareDisk: () => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  changeDiskSpritesheet,
  deleteDisk,
  dismissDisk,
  renameDisk,
  shareDisk,
}

export function DiskPanelInspector({
  changeDiskSpritesheet,
  deleteDisk,
  disk,
  dismissDisk,
  renameDisk,
  shareDisk,
}: DiskPanelInspectorProps) {
  const [mode, setMode] = React.useState<DiskPanelInspectorModes>(
    DiskPanelInspectorModes.Neutral
  )
  const [name, setName] = React.useState(disk.name)

  const onDeleteStart = React.useCallback(() => {
    setMode(DiskPanelInspectorModes.Delete)
  }, [])

  const onDeleteCancel = React.useCallback(() => {
    setMode(DiskPanelInspectorModes.Neutral)
  }, [])

  const onDeleteConfirm = React.useCallback(() => {
    deleteDisk(disk.id)
  }, [])

  const onDismiss = React.useCallback(() => {
    dismissDisk(disk.id)
  }, [])

  const onRenameStart = React.useCallback(() => {
    setMode(DiskPanelInspectorModes.Rename)
  }, [])

  const onRenameEdit = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onRenameSubmit = React.useCallback(() => {
    renameDisk(name)
    setMode(DiskPanelInspectorModes.Neutral)
  }, [name])

  const onShareStart = React.useCallback(() => {
    shareDisk()
  }, [])

  const onSpritesheetChange = React.useCallback(async () => {
    const image = await DocumentPicker.getDocumentAsync({ type: "image/png" })
    const uri = await FileSystem.readAsStringAsync(image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    changeDiskSpritesheet(uri)
  }, [])

  return (
    <View style={styles.component}>
      <View style={styles.navigation}>
        <Button onPress={onDismiss}>done</Button>
      </View>

      <View style={styles.header}>
        <View style={styles.headerIconColumn}>
          <DiskIcon id={disk.id} size={128} />
        </View>
        <View style={styles.headerNameColumn}>
          {{
            [DiskPanelInspectorModes.Neutral]: () => (
              <>
                <View style={styles.headerNameOutput}>
                  <Font fontSize={24}>{disk.name}</Font>
                </View>
                <View style={styles.headerNameButtons}>
                  <View style={styles.headerNameButton}>
                    <Button onPress={onShareStart} theme="blue">
                      share
                    </Button>
                  </View>
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

            [DiskPanelInspectorModes.Rename]: () => (
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

            [DiskPanelInspectorModes.Delete]: () => (
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

      <View style={styles.spritesheetSection}>
        <View style={styles.spritesheetImageColumn}>
          <DiskPanelInspectorSpritesheet id={disk.id} size={128} />
        </View>
        <View style={styles.spritesheetButtonsColumn}>
          <View style={styles.spritesheetTitle}>
            <Font fontSize={24}>spritesheet</Font>
          </View>
          <View style={styles.spritesheetButtons}>
            <Button onPress={onSpritesheetChange}>change</Button>
          </View>
        </View>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelInspector)
