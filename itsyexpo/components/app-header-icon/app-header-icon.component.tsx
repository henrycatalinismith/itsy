import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Floppy from "@highvalley.systems/itsyexpo/components/floppy"
import {
  Disk,
  DiskTypes,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header-icon.module.scss"

interface AppHeaderIconProps {
  disk: Disk
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {}

export function AppHeaderIcon({ disk }: AppHeaderIconProps) {
  return (
    <View style={styles.component}>
      {disk.type === DiskTypes.Empty ? (
        <Floppy />
      ) : (
        <DiskIcon id={disk.id} size={24} />
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderIcon)
