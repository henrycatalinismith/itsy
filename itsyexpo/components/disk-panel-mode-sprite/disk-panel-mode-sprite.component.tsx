import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmode from "@highvalley.systems/itsyexpo/components/disk-panel-submode"
import DiskSpritesheet from "@highvalley.systems/itsyexpo/components/disk-spritesheet"
import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import {
  changeDiskSpritesheet,
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import { Rect } from "@highvalley.systems/typedefs/itsy"
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
  const layout: Rect = React.useContext(LayoutContext)
  const size = layout.width - 20

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
    <DiskPanelSubmode title="spritesheet">
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
      <View style={styles.spritesheet}>
        <DiskSpritesheet id={disk.id} size={size} />
      </View>
    </DiskPanelSubmode>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeSprite)
