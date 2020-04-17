import Loading from "@highvalley.systems/itsyexpo/components/loading"
import PlayPanelScreenPlayer from "@highvalley.systems/itsyexpo/components/play-panel-screen-player"
import PlayPanelScreenSnapshot from "@highvalley.systems/itsyexpo/components/play-panel-screen-snapshot"
import {
  PlayerModes,
  selectPlayerMode,
} from "@highvalley.systems/itsyexpo/store/player"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./play-panel-screen.module.scss"

interface PlayPanelScreenProps {
  playerMode: PlayerModes
  appendConsoleText: (text: string) => void
}

const mapStateToProps = (state) => ({
  playerMode: selectPlayerMode(state),
})

const mapDispatchToProps = {}

export function PlayPanelScreen({
  appendConsoleText,
  playerMode,
}: PlayPanelScreenProps) {
  return (
    <View style={styles.screen}>
      {playerMode === PlayerModes.Load ? (
        <Loading />
      ) : [PlayerModes.Busy, PlayerModes.Halt].includes(playerMode) ? (
        <PlayPanelScreenPlayer appendConsoleText={appendConsoleText} />
      ) : (
        <PlayPanelScreenSnapshot />
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanelScreen)
