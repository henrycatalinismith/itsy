import React from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"

import { Disk, selectNormalDisks } from "@itsy.studio/studio/store/disks"

import DiskListItem from "@itsy.studio/studio/components/disk-list-item"
import styles from "./disk-list.module.scss"

interface DiskListProps {
  disks: Disk[]
}

const mapStateToProps = (state, { id }) => ({
  disks: selectNormalDisks(state),
})

const mapDispatchToProps = {}

export function DiskList({ disks }: DiskListProps) {
  return (
    <ScrollView style={styles.diskList}>
      {disks.map((disk) => (
        <DiskListItem key={disk.id} id={disk.id} />
      ))}
    </ScrollView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskList)
