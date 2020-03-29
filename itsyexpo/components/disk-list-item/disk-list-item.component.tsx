import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { connect } from "react-redux"
import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import {
  Disk,
  inspectDisk,
  openDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import DiskIcon, {
  DiskIconProps,
} from "@highvalley.systems/itsyexpo/components/disk-icon"
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
  const layout: Rect = React.useContext(LayoutContext)
  const diskListItemStyles = [styles.diskListItem]

  if (disk.active) {
    diskListItemStyles.push(styles.active)
  }

  const narrowWidth = 320

  const diskIconSize = (() => {
    switch (true) {
      case layout.width < narrowWidth:
        return 32

      default:
        return 64
    }
  })()

  const diskIconProps: Partial<DiskIconProps> = {
    id: disk.id,
    size: diskIconSize,
  }

  const fontSize = (() => {
    switch (true) {
      case layout.width < narrowWidth:
        return 16

      default:
        return 20
    }
  })()

  console.log(layout)

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
        <DiskIcon {...diskIconProps} />
      </View>
      <View style={styles.name}>
        <Font fontSize={fontSize}>{disk.name}</Font>
      </View>
    </TouchableOpacity>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskListItem)
