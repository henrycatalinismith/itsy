import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Loading from "@itsy.studio/studio/components/loading"
import Player from "@itsy.studio/studio/components/player"
import Snapshot from "@itsy.studio/studio/components/snapshot"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import styles from "@itsy.studio/studio/components/devtools-play-tab/devtools-play-tab.module.scss"

interface DevtoolsPlayTabProps {
  player: PlayerState
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {}

export function DevtoolsPlayTab({ player }: DevtoolsPlayTabProps) {
  return (
    <View style={styles.devtoolsPlayTab}>
      {player.waiting ? (
        <Loading />
      ) : player.running || player.stopping ? (
        <Player />
      ) : (
        <Snapshot />
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsPlayTab)
