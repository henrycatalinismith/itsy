import PlayPanelConsoleToolbarPlay from "@highvalley.systems/itsyexpo/components/play-panel-console-toolbar-play"
import PlayPanelConsoleToolbarClear from "@highvalley.systems/itsyexpo/components/play-panel-console-toolbar-clear"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./play-panel-console-toolbar.module.scss"

interface PlayPanelConsoleToolbarProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function PlayPanelConsoleToolbar({}: PlayPanelConsoleToolbarProps) {
  return (
    <View style={styles.component}>
      <PlayPanelConsoleToolbarPlay />
      <PlayPanelConsoleToolbarClear />
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPanelConsoleToolbar)
