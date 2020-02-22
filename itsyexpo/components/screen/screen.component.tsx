import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Loading from "@highvalley.systems/itsyexpo/components/loading"
import Player from "@highvalley.systems/itsyexpo/components/player"
import Snapshot from "@highvalley.systems/itsyexpo/components/snapshot"
import { PlayerState, playerSelector } from "@highvalley.systems/itsyexpo/store/player"
import styles from "./screen.module.scss"

interface ScreenProps {
  player: PlayerState
  appendConsoleText: (text: string) => void
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {}

export function Screen({ appendConsoleText, player }: ScreenProps) {
  return (
    <View style={styles.screen}>
      {player.waiting ? (
        <Loading />
      ) : player.running || player.stopping ? (
        <Player appendConsoleText={appendConsoleText} />
      ) : (
        <Snapshot />
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
