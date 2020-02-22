import React from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"

import {
  Disk,
  createDisk,
  selectNormalDisks,
} from "@itsy.studio/studio/store/disks"

import Button from "@itsy.studio/studio/components/button"
import DiskListItem from "@itsy.studio/studio/components/disk-list-item"
import styles from "./disk-list.module.scss"

interface DiskListProps {
  createDisk: () => void
  disks: Disk[]
}

const mapStateToProps = (state, { id }) => ({
  disks: selectNormalDisks(state),
})

const mapDispatchToProps = {
  createDisk,
}

export function DiskList({ createDisk, disks }: DiskListProps) {
  return (
    <View style={styles.diskList}>
      <View style={styles.controls}>
        <Button onPress={() => createDisk()}>new</Button>
      </View>
      <ScrollView style={styles.diskList}>
        {disks.map((disk) => (
          <DiskListItem key={disk.id} id={disk.id} />
        ))}
      </ScrollView>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskList)
