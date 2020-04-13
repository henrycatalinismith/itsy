import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import DiskPanelModeBrowseListItem, {
  DiskPanelModeBrowseListItemHeights,
} from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse-list-item"
import {
  Disk,
  selectNormalDisks,
} from "@highvalley.systems/itsyexpo/store/disks"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { View, VirtualizedList, VirtualizedListProps } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-browse-list.module.scss"

interface DiskPanelModeBrowseListProps {
  disks: Disk[]
}

const mapStateToProps = (state, { id }) => ({
  disks: selectNormalDisks(state),
})

const mapDispatchToProps = {}

export function DiskPanelModeBrowseList({
  disks,
}: DiskPanelModeBrowseListProps) {
  const layout: Rect = React.useContext(LayoutContext)

  const narrowWidth = 320
  const diskIconHeight = (() => {
    switch (true) {
      case layout.width < narrowWidth:
        return DiskPanelModeBrowseListItemHeights.Short
      default:
        return DiskPanelModeBrowseListItemHeights.Tall
    }
  })()

  const length =
    diskIconHeight === DiskPanelModeBrowseListItemHeights.Short ? 32 : 64

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
      <DiskPanelModeBrowseListItem
        key={disk.id}
        id={disk.id}
        height={diskIconHeight}
      />
    )
  }

  const list: VirtualizedListProps<DiskPanelModeBrowseListItem> = {
    data: [],
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeBrowseList)
