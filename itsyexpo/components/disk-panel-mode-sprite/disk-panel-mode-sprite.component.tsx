import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskSpritesheet from "@highvalley.systems/itsyexpo/components/disk-spritesheet"
import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import {
  changeDiskSpritesheet,
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-sprite.module.scss"

interface DiskPanelModeSpriteProps {
  disk: Disk
  changeDiskSpritesheet: (uri: string) => void
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  changeDiskSpritesheet,
  setDiskPanelMode,
}

export function DiskPanelModeSprite({
  changeDiskSpritesheet,
  disk,
  setDiskPanelMode,
}: DiskPanelModeSpriteProps) {
  const onCancel = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Inspect)
  }, [])

  const onChange = React.useCallback(async () => {
    const image = await DocumentPicker.getDocumentAsync({ type: "image/png" })
    const uri = await FileSystem.readAsStringAsync(image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    changeDiskSpritesheet(uri)
  }, [])

  return (
    <View style={styles.component}>
      <View style={styles.prompt}>
        <Font fontSize={24}>spritesheet</Font>
      </View>
      <View style={styles.spritesheet}>
        <DiskSpritesheet id={disk.id} size={128} />
      </View>
      <View style={styles.buttons}>
        <View style={styles.change}>
          <Button onPress={onChange} theme={ButtonThemes.Blue}>
            change
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

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeSprite)
