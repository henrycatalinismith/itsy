import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import DevtoolsPlayPanelConsole from "@itsy.studio/studio/components/devtools-play-panel-console"
import DevtoolsPlayPanelControls from "@itsy.studio/studio/components/devtools-play-panel-controls"
import DevtoolsPlayPanelScreen from "@itsy.studio/studio/components/devtools-play-panel-screen"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "@itsy.studio/studio/components/devtools-play-panel/devtools-play-panel.module.scss"

interface DevtoolsPlayPanelProps {
  player: PlayerState
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function DevtoolsPlayPanel({ player, screen }: DevtoolsPlayPanelProps) {
  const panelWidth = {
    width: screen.width,
  }

  const screenHeight = {
    height: screen.width - 4,
  }

  return (
    <View style={[styles.devtoolsPlayPanel, panelWidth]}>
      <View style={[styles.screen, screenHeight]}>
        <DevtoolsPlayPanelScreen />
      </View>
      <View style={styles.controls}>
        <DevtoolsPlayPanelControls />
      </View>
      <View style={styles.console}>
        <DevtoolsPlayPanelConsole />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsPlayPanel)
