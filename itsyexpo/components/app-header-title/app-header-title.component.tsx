import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  Disk,
  DiskTypes,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header-title.module.scss"

interface AppHeaderTitleProps {
  disk: Disk
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {}

export function AppHeaderTitle({ disk }: AppHeaderTitleProps) {
  return (
    <View style={styles.component}>
      {!disk || disk.type === DiskTypes.Empty ? (
        <Font>itsy.studio</Font>
      ) : (
        <Font>{disk.name}</Font>
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderTitle)
