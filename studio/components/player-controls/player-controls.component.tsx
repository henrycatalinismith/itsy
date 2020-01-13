import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Play from "@itsy.studio/studio/components/play"
import Stop from "@itsy.studio/studio/components/stop"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import styles from "./player-controls.module.scss"

interface PlayerControlsProps {
  player: PlayerState
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {}

export function PlayerControls({ player }: PlayerControlsProps) {
  return (
    <View style={styles.playerControls}>
      {player.running || player.waiting || player.stopping ? (
        <Stop />
      ) : (
        <Play />
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)
