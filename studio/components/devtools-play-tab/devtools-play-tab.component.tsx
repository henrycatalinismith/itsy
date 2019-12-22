import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { onPlayTabTouch } from "@itsy.studio/studio/store/devtools"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import Button from "@itsy.studio/studio/components/button"
import styles from "@itsy.studio/studio/components/devtools-play-tab/devtools-play-tab.module.scss"

interface DevtoolsPlayTabProps {
  onPlayTabTouch: () => void
  player: PlayerState
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {
  onPlayTabTouch,
}

export function DevtoolsPlayTab({
  onPlayTabTouch,
  player,
}: DevtoolsPlayTabProps) {
  return (
    <Button onPress={onPlayTabTouch}>{player.running ? "stop" : "play"}</Button>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsPlayTab)
