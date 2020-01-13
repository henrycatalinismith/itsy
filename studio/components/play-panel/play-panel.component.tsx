import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Console from "@itsy.studio/studio/components/console"
import PlayerControls from "@itsy.studio/studio/components/player-controls"
import Screen from "@itsy.studio/studio/components/screen"
import Panel from "@itsy.studio/studio/components/panel"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "./play-panel.module.scss"

interface PlayPanelProps {
  player: PlayerState
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function PlayPanel({ player, screen }: PlayPanelProps) {
  const panelWidth = {
    width: screen.width,
  }

  const screenHeight = {
    height: screen.width - 4,
  }

  return (
    <Panel width={screen.width}>
      <View style={[styles.screen, screenHeight]}>
        <Screen />
      </View>
      <View style={styles.controls}>
        <PlayerControls />
      </View>
      <View style={styles.console}>
        <Console />
      </View>
    </Panel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanel)
