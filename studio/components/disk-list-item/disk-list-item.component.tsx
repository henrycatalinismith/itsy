import React from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { connect } from "react-redux"

import { Disk, inspectDisk, openDisk } from "@itsy.studio/studio/store/disks"

import DiskIcon from "@itsy.studio/studio/components/disk-icon"
import Font from "@itsy.studio/studio/components/font"
import styles from "./disk-list-item.module.scss"

interface DiskListItemProps {
  id: string
  disk: Disk
  inspectDisk: (id: string) => void
  openDisk: (id: string) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: state.disks[id],
})

const mapDispatchToProps = {
  inspectDisk,
  openDisk,
}

export function DiskListItem({
  disk,
  inspectDisk,
  openDisk,
}: DiskListItemProps) {
  const diskListItemStyles = [styles.diskListItem]

  if (disk.active) {
    diskListItemStyles.push(styles.active)
  }

  const onLongPress = React.useCallback(() => {
    inspectDisk(disk.id)
  }, [])

  const onPress = React.useCallback(() => {
    openDisk(disk.id)
  }, [])

  const touchableOpacity: TouchableOpacityProps = {
    style: diskListItemStyles,
    onLongPress,
    onPress: onPress,
  }

  return (
    <TouchableOpacity {...touchableOpacity}>
      <View style={styles.icon}>
        <DiskIcon id={disk.id} size={64} />
      </View>
      <View style={styles.name}>
        <Font fontSize={20}>{disk.name}</Font>
      </View>
    </TouchableOpacity>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskListItem)
