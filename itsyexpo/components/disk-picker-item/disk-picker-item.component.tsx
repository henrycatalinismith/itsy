import DiskIcon, {
  DiskIconProps,
} from "@highvalley.systems/itsyexpo/components/disk-icon"
import Font from "@highvalley.systems/itsyexpo/components/font"
import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-picker-item.module.scss"

export enum DiskPickerItemHeights {
  Short = "Short",
  Tall = "Tall",
}

interface DiskPickerItemProps {
  disk: Disk
  onSelect: (disk: Disk) => void
  height?: DiskPickerItemHeights
  active?: boolean
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPickerItem({
  disk,
  onSelect,
  height = DiskPickerItemHeights.Short,
  active = false,
}: DiskPickerItemProps) {
  const diskListItemStyles = [styles.component, styles[height]]

  if (active) {
    diskListItemStyles.push(styles.active)
  }

  const fontSize = height === DiskPickerItemHeights.Short ? 16 : 20

  const diskIconProps: Partial<DiskIconProps> = {
    disk,
    size: height === DiskPickerItemHeights.Short ? 32 : 64,
  }

  const onPress = React.useCallback(() => {
    onSelect(disk)
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

export default connect(mapStateToProps, mapDispatchToProps)(DiskPickerItem)
