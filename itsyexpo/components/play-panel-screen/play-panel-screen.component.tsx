import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Loading from "@highvalley.systems/itsyexpo/components/loading"
import PlayPanelScreenPlayer from "@highvalley.systems/itsyexpo/components/play-panel-screen-player"
import PlayPanelScreenSnapshot from "@highvalley.systems/itsyexpo/components/play-panel-screen-snapshot"
import {
  PlayerState,
  playerSelector,
} from "@highvalley.systems/itsyexpo/store/player"
import styles from "./play-panel-screen.module.scss"

interface PlayPanelScreenProps {
  player: PlayerState
  appendConsoleText: (text: string) => void
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {}

export function PlayPanelScreen({
  appendConsoleText,
  player,
}: PlayPanelScreenProps) {
  return (
    <View style={styles.screen}>
      {player.waiting ? (
        <Loading />
      ) : player.running || player.stopping ? (
        <PlayPanelScreenPlayer appendConsoleText={appendConsoleText} />
      ) : (
        <PlayPanelScreenSnapshot />
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanelScreen)
