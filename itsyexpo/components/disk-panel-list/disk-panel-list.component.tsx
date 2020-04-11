import Button from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelListItem from "@highvalley.systems/itsyexpo/components/disk-panel-list-item"
import {
  createDisk,
  Disk,
  selectNormalDisks,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-list.module.scss"

interface DiskPanelListProps {
  createDisk: () => void
  disks: Disk[]
}

const mapStateToProps = (state, { id }) => ({
  disks: selectNormalDisks(state),
})

const mapDispatchToProps = {
  createDisk,
}

export function DiskPanelList({ createDisk, disks }: DiskPanelListProps) {
  console.log(disks.length)
  return (
    <View style={styles.component}>
      <View style={styles.controls}>
        <Button onPress={() => createDisk()}>new</Button>
      </View>
      <ScrollView style={styles.component}>
        {disks.map((disk) => (
          <DiskPanelListItem key={disk.id} id={disk.id} />
        ))}
      </ScrollView>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelList)
