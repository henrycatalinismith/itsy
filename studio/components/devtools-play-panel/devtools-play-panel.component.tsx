import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Loading from "@itsy.studio/studio/components/loading"
import Player from "@itsy.studio/studio/components/player"
import Play from "@itsy.studio/studio/components/play"
import Stop from "@itsy.studio/studio/components/stop"
import Snapshot from "@itsy.studio/studio/components/snapshot"
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
  const playerHeight = {
    height: screen.width - 4,
  }

  return (
    <View style={styles.devtoolsPlayPanel}>
      <View style={[styles.player, playerHeight]}>
        {player.waiting ? (
          <Loading />
        ) : player.running || player.stopping ? (
          <Player />
        ) : (
          <Snapshot />
        )}
      </View>
      <View style={styles.controls}>
        {player.running || player.waiting || player.stopping ? (
          <Stop />
        ) : (
          <Play />
        )}
      </View>
      <View style={styles.console}></View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsPlayPanel)
