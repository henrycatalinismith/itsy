import Loading from "@highvalley.systems/itsyexpo/components/loading"
import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import {
  PlayerModes,
  selectPlayerMode,
} from "@highvalley.systems/itsyexpo/store/player"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Itsy from "./itsy.component"
import styles from "./player.module.scss"
import Snapshot from "./snapshot.component"

interface PlayerProps {
  disk: Disk
  playerMode: PlayerModes
}

const mapStateToProps = (state) => ({
  playerMode: selectPlayerMode(state),
})

const mapDispatchToProps = {}

export function Player({ disk, playerMode }: PlayerProps) {
  return (
    <View style={styles.component}>
      {playerMode === PlayerModes.Load ? (
        <Loading />
      ) : [PlayerModes.Busy, PlayerModes.Halt].includes(playerMode) ? (
        <Itsy disk={disk} />
      ) : (
        <Snapshot disk={disk} />
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
