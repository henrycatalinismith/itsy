import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import DiskPickerItem, {
  DiskPickerItemHeights,
} from "@highvalley.systems/itsyexpo/components/disk-picker-item"
import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { View, VirtualizedList, VirtualizedListProps } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-picker.module.scss"

interface DiskPickerProps {
  disks: Disk[]
  onSelect: (disk: Disk) => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPicker({ disks, onSelect }: DiskPickerProps) {
  const layout: Rect = React.useContext(LayoutContext)

  const narrowWidth = 320
  const diskIconHeight = (() => {
    switch (true) {
      case layout.width < narrowWidth:
        return DiskPickerItemHeights.Short
      default:
        return DiskPickerItemHeights.Tall
    }
  })()

  const length = diskIconHeight === DiskPickerItemHeights.Short ? 32 : 64

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
