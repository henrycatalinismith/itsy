import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { connect } from "react-redux"

import {
  Disk,
  dismissDisk,
  selectInspectedDisk,
} from "@itsy.studio/studio/store/disks"

import Font from "@itsy.studio/studio/components/font"
import styles from "./disk-list-item.module.scss"

interface DiskInspectorProps {
  disk: Disk
  dismissDisk: (id: string) => void
}

const mapStateToProps = (state, { id }) => ({
  disk: selectInspectedDisk(state),
})

const mapDispatchToProps = {
  dismissDisk,
}

export function DiskInspector({ disk, dismissDisk }: DiskInspectorProps) {
  const onDismiss = React.useCallback(() => {
    dismissDisk(disk.id)
  }, [])

  return (
    <View>
      <Text>{disk.name}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <Text>dismiss</Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskInspector)
