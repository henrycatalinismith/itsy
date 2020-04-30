import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Floppy from "@highvalley.systems/itsyexpo/components/floppy"
import {
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header-icon.module.scss"

interface AppHeaderIconProps {
  activeDisk: Disk
}

const mapStateToProps = (state) => ({
  activeDisk: selectActiveDisk(state),
})

const mapDispatchToProps = {}

export function AppHeaderIcon({ activeDisk }: AppHeaderIconProps) {
  return (
    <View style={styles.component}>
      {activeDisk ? <DiskIcon disk={activeDisk} size={24} /> : <Floppy />}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderIcon)
