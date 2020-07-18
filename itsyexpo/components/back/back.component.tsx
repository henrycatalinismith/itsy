import { PlayerModes } from "@highvalley.systems/itsyexpo/store/player"
import { RootState } from "@highvalley.systems/itsyexpo/store"
import Font from "@highvalley.systems/itsyexpo/components/font"
import { ActivityIndicator, TouchableOpacity, View } from "react-native"
import React from "react"
import { connect } from "react-redux"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import styles from "./back.module.scss"

export interface BackProps {
  onPress: () => void
  playerMode: PlayerModes
}

const mapStateToProps = (state: RootState) => ({
  playerMode: state.player.mode,
})

const mapDispatchToProps = {}

export function Back({ playerMode, onPress }: BackProps): React.ReactElement {
  return (
    <View style={styles.component}>
      {[PlayerModes.Idle].includes(playerMode) && (
        <TouchableOpacity onPress={onPress}>
          <Font fontSize={24}>{"<"}</Font>
        </TouchableOpacity>
      )}

      {[PlayerModes.Busy, PlayerModes.Halt, PlayerModes.Load].includes(
        playerMode
      ) && <ActivityIndicator color={colors[0]} />}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Back)
