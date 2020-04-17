import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmodeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-submode-inspect"
import DiskSpritesheet from "@highvalley.systems/itsyexpo/components/disk-spritesheet"
import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import {
  changeDiskSpritesheet,
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
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

  const onImport = React.useCallback(async () => {
    const image = await DocumentPicker.getDocumentAsync({ type: "image/png" })
    const uri = await FileSystem.readAsStringAsync(image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    changeDiskSpritesheet(uri)
  }, [])

  const onExport = React.useCallback(async () => {
    const uri = `${FileSystem.documentDirectory}spritesheet.png`
    const data = disk.spritesheet
    await FileSystem.writeAsStringAsync(uri, data, { encoding: "base64" })
    const sharingOptions = {
      dialogTitle: "Export spritesheet",
      mimeType: "image/png",
      UTI: "image/png",
    }
    await Sharing.shareAsync(uri, sharingOptions)
  }, [])

  const onCancel = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Inspect)
  }, [])

  return (
    <DiskPanelSubmodeInspect title="spritesheet" style={styles.component}>
      <View style={styles.buttons}>
        <View style={styles.import}>
          <Button onPress={onImport} theme={ButtonThemes.Blue}>
            import
          </Button>
        </View>
        <View style={styles.export}>
          <Button onPress={onExport} theme={ButtonThemes.Gray}>
            export
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
    </DiskPanelSubmodeInspect>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeSprite)
