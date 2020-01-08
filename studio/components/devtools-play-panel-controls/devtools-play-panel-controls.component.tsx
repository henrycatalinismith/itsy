import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Play from "@itsy.studio/studio/components/play"
import Stop from "@itsy.studio/studio/components/stop"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import styles from "./devtools-play-panel-controls.module.scss"

interface DevtoolsPlayPanelControlsProps {
  player: PlayerState
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {}

export function DevtoolsPlayPanelControls({
  player,
}: DevtoolsPlayPanelControlsProps) {
  return (
    <View style={styles.devtoolsPlayPanelControls}>
      {player.running || player.waiting || player.stopping ? (
        <Stop />
      ) : (
        <Play />
      )}
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevtoolsPlayPanelControls)
