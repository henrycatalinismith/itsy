import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-inspect-header.module.scss"

interface DiskPanelModeInspectHeaderProps {
  disk: Disk
}

const mapStateToProps = (state, { id }) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {}

export function DiskPanelModeInspectHeader({
  disk,
}: DiskPanelModeInspectHeaderProps) {
  return (
    <View style={styles.component}>
      <View style={styles.icon}>
        <DiskIcon disk={disk} size={72} />
      </View>
      <View style={styles.name}>
        <Font fontSize={24}>{disk.name}</Font>
      </View>
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeInspectHeader)
