import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Loading from "@itsy.studio/studio/components/loading"
import Player from "@itsy.studio/studio/components/player"
import Snapshot from "@itsy.studio/studio/components/snapshot"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
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
