import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import { shareDisk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-inspect-actions.module.scss"

interface DiskPanelModeInspectActionsProps {
  setDiskPanelMode: (mode: DiskPanelModes) => void
  shareDisk: () => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {
  setDiskPanelMode,
  shareDisk,
}

export function DiskPanelModeInspectActions({
  setDiskPanelMode,
  shareDisk,
}: DiskPanelModeInspectActionsProps) {
  const onDelete = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Delete)
  }, [])

  const onRename = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Rename)
  }, [])

  const onShare = React.useCallback(() => {
    shareDisk()
  }, [])

  const onSprite = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Sprite)
  }, [])

  return (
    <View style={styles.component}>
      <View style={styles.action}>
        <Button onPress={onShare} theme={ButtonThemes.Blue}>
          share
        </Button>
        <Text style={styles.label}>export playable copy of disk</Text>
      </View>
      <View style={styles.action}>
        <Button onPress={onRename} theme={ButtonThemes.Gray}>
          rename
        </Button>
        <Text style={styles.label}>give the disk a new name</Text>
      </View>
      <View style={styles.action}>
        <Button onPress={onSprite} theme={ButtonThemes.Gray}>
          sprite
        </Button>
        <Text style={styles.label}>replace the spritesheet</Text>
      </View>
      <View style={styles.action}>
        <Button onPress={onDelete} theme={ButtonThemes.Red}>
          delete
        </Button>
        <Text style={styles.label}>remove the disk</Text>
      </View>
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeInspectActions)
