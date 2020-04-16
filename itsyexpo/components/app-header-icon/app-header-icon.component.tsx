import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Floppy from "@highvalley.systems/itsyexpo/components/floppy"
import {
  Disk,
  DiskTypes,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import { selectDisk } from "@highvalley.systems/itsyexpo/store/disk"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header-icon.module.scss"

interface AppHeaderIconProps {
  activeDisk: Disk
  disk: string
}

const mapStateToProps = (state) => ({
  activeDisk: selectActiveDisk(state),
  disk: selectDisk(state),
})

const mapDispatchToProps = {}

export function AppHeaderIcon({ activeDisk, disk }: AppHeaderIconProps) {
  return (
    <View style={styles.component}>
      {disk === "empty" ? (
        <Floppy />
      ) : (
        <DiskIcon id={activeDisk.id} size={24} />
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderIcon)
