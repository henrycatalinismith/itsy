import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import ConsoleOutput from "./console-output.component"
import ConsoleToolbar from "./console-toolbar.component"
import styles from "./console.module.scss"

interface ConsoleProps {
  disk: Disk
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function Console({ disk }: ConsoleProps) {
  return (
    <View style={styles.component}>
      <ConsoleToolbar disk={disk} />
      <ConsoleOutput disk={disk} />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)
