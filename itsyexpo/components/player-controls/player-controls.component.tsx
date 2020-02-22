import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Font from "@highvalley.systems/itsyexpo/components/font"
import Play from "@highvalley.systems/itsyexpo/components/play"
import Stop from "@highvalley.systems/itsyexpo/components/stop"
import { PlayerState, playerSelector } from "@highvalley.systems/itsyexpo/store/player"
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
        <>
          <Stop />
          <Font>stop</Font>
        </>
      ) : (
        <>
          <Play />
          <Font>play</Font>
        </>
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)
