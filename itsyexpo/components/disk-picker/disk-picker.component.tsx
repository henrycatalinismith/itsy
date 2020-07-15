import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View, VirtualizedList, VirtualizedListProps } from "react-native"
import { connect } from "react-redux"
import DiskPickerItem, {
  DiskPickerItemHeights,
} from "./disk-picker-item.component"
import styles from "./disk-picker.module.scss"

interface DiskPickerProps {
  disks: Disk[]
  onSelect: (disk: Disk) => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPicker({ disks, onSelect }: DiskPickerProps) {
  const diskIconHeight = DiskPickerItemHeights.Short
  const length = 32

  const getItem = (data, index) => disks[index]

  const getItemCount = () => disks.length

  const getItemLayout = (data, index) => {
    return {
      length,
      offset: 64 * index,
      index,
    }
  }

  const keyExtractor = (disk) => disk.id

  const initialNumToRender = 32

  const renderItem = ({ item: disk }): React.ReactElement => {
    return (
      <DiskPickerItem
        key={disk.id}
        disk={disk}
        height={diskIconHeight}
        onSelect={(disk) => onSelect(disk)}
      />
    )
  }

  const list: VirtualizedListProps<DiskPickerItem> = {
    data: disks,
    getItem,
    getItemCount,
    getItemLayout,
    keyExtractor,
    initialNumToRender,
    renderItem,
  }

  return (
    <View style={styles.component}>
      <VirtualizedList {...list} />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPicker)
