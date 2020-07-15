import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import PlayPanelConsoleOutput from "@highvalley.systems/itsyexpo/components/play-panel-console-output"
import PlayPanelConsoleToolbar from "@highvalley.systems/itsyexpo/components/play-panel-console-toolbar"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./play-panel-console.module.scss"

interface PlayPanelConsoleProps {
  disk: Disk
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function PlayPanelConsole({ disk }: PlayPanelConsoleProps) {
  return (
    <View style={styles.component}>
      <PlayPanelConsoleToolbar disk={disk} />
      <PlayPanelConsoleOutput disk={disk} />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanelConsole)
