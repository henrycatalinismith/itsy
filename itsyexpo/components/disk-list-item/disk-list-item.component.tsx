import React from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { connect } from "react-redux"

import { Disk, inspectDisk, openDisk } from "@highvalley.systems/itsyexpo/store/disks"

import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Font from "@highvalley.systems/itsyexpo/components/font"
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

  const onPress = React.useCallback(() => {
    if (disk.active) {
      inspectDisk(disk.id)
    } else {
      openDisk(disk.id)
    }
  }, [disk.active])

  const touchableOpacity: TouchableOpacityProps = {
    style: diskListItemStyles,
    onPress,
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
