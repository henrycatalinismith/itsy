import DiskIcon, {
  DiskIconProps,
} from "@highvalley.systems/itsyexpo/components/disk-icon"
import Font from "@highvalley.systems/itsyexpo/components/font"
import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import {
  Disk,
  inspectDisk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-browse-list-item.module.scss"

interface DiskPanelModeBrowseListItemProps {
  id: string
  disk: Disk
  activeDisk: Disk
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
}: DiskPanelModeBrowseListItemProps) {
  const layout: Rect = React.useContext(LayoutContext)
  const diskListItemStyles = [styles.component]

  const active = disk.id === activeDisk.id
  if (active) {
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
    if (active) {
      inspectDisk(disk.id)
    } else {
      openDisk(disk.id)
    }
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
