import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  Disk,
  DiskTypes,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import { selectDisk } from "@highvalley.systems/itsyexpo/store/disk"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header-title.module.scss"

interface AppHeaderTitleProps {
  activeDisk: Disk
  disk: string
}

const mapStateToProps = (state) => ({
  activeDisk: selectActiveDisk(state),
  disk: selectDisk(state),
})

const mapDispatchToProps = {}

export function AppHeaderTitle({ activeDisk, disk }: AppHeaderTitleProps) {
  return (
    <View style={styles.component}>
      {disk === "empty" ? (
        <Font>itsy studio</Font>
      ) : (
        <Font>{activeDisk.name}</Font>
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderTitle)
