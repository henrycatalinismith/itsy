import DiskIcon, {
  DiskIconProps,
} from "@highvalley.systems/itsyexpo/components/disk-icon"
import Font from "@highvalley.systems/itsyexpo/components/font"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import {
  Disk,
  inspectDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-browse-list-item.module.scss"

export enum DiskPanelModeBrowseListItemHeights {
  Short = "Short",
  Tall = "Tall",
}

interface DiskPanelModeBrowseListItemProps {
  id: string
  disk: Disk
  activeDisk: Disk
  height: DiskPanelModeBrowseListItemHeights
  inspectDisk: (id: string) => void
  openDisk: (id: string) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: state.disks[id],
  activeDisk: selectActiveDisk(state),
})

const mapDispatchToProps = {
  inspectDisk,
  openDisk,
}

export function DiskPanelModeBrowseListItem({
  disk,
  activeDisk,
  inspectDisk,
  openDisk,
  height,
}: DiskPanelModeBrowseListItemProps) {
  const diskListItemStyles = [styles.component, styles[height]]

  const active = disk.id === activeDisk.id
  if (active) {
    diskListItemStyles.push(styles.active)
  }

  const fontSize = height === DiskPanelModeBrowseListItemHeights.Short ? 16 : 20

  const diskIconProps: Partial<DiskIconProps> = {
    id: disk.id,
    size: height === DiskPanelModeBrowseListItemHeights.Short ? 32 : 64,
  }

  const onPress = React.useCallback(() => {
    openDisk(disk.id)
  }, [active])

  const touchableOpacity: TouchableOpacityProps = {
    style: diskListItemStyles,
    onPress,
  }

  return (
    <TouchableOpacity {...touchableOpacity}>
      <View style={styles.icon}>
        <DiskIcon {...diskIconProps} />
      </View>
      <View style={styles.name}>
        <Font fontSize={fontSize}>{disk.name}</Font>
      </View>
    </TouchableOpacity>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeBrowseListItem)
