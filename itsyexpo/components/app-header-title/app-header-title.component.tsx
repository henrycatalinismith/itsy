import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header-title.module.scss"

interface AppHeaderTitleProps {
  activeDisk: Disk
}

const mapStateToProps = (state) => ({
  activeDisk: selectActiveDisk(state),
})

const mapDispatchToProps = {}

export function AppHeaderTitle({ activeDisk }: AppHeaderTitleProps) {
  return (
    <View style={styles.component}>
      {activeDisk ? <Font>{activeDisk.name}</Font> : <Font>itsy studio</Font>}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderTitle)
