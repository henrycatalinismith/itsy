import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { clearOutput } from "@highvalley.systems/itsyexpo/store/output"
import Button from "@highvalley.systems/itsyexpo/components/button"
import PlayerControls from "@highvalley.systems/itsyexpo/components/player-controls"
import styles from "./play-panel-console-toolbar.module.scss"

interface PlayPanelConsoleToolbarProps {
  clearOutput: () => void
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  clearOutput,
}

export function PlayPanelConsoleToolbar({
  clearOutput,
}: PlayPanelConsoleToolbarProps) {
  return (
    <View style={styles.component}>
      <PlayerControls />
      <Button onPress={clearOutput}>clear</Button>
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPanelConsoleToolbar)
