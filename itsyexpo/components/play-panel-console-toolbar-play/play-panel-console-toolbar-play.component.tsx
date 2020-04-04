import Button from "@highvalley.systems/itsyexpo/components/button"
import { playDisk, stopDisk } from "@highvalley.systems/itsyexpo/store/disks"
import {
  playerSelector,
  PlayerState,
} from "@highvalley.systems/itsyexpo/store/player"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import React from "react"
import { Path, Svg } from "react-native-svg"
import { connect } from "react-redux"

interface PlayPanelConsoleToolbarPlayProps {
  player: PlayerState
  playDisk: () => void
  stopDisk: () => void
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {
  playDisk,
  stopDisk,
}

export function PlayPanelConsoleToolbarPlay({
  player,
  playDisk,
  stopDisk,
}: PlayPanelConsoleToolbarPlayProps) {
  return (
    <>
      {player.running || player.waiting || player.stopping ? (
        <Button onPress={stopDisk}>
          <Svg width={16} height={12} viewBox="0 0 40 48">
            <Path
              d="M8,8 L32,24 L8,40 L8,8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={8}
              stroke={colors[1]}
            />
            <Path
              d="M8,8 L32,24 L8,40 L8,8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke={colors[3]}
              fill={colors[8]}
            />
          </Svg>
          stop
        </Button>
      ) : (
        <Button onPress={playDisk}>
          <Svg width={16} height={16} viewBox="0 0 40 48">
            <Path
              d="M8,8 L32,24 L8,40 L8,8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={8}
              stroke={colors[1]}
            />
            <Path
              d="M8,8 L32,24 L8,40 L8,8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke={colors[3]}
              fill={colors[11]}
            />
          </Svg>
          play
        </Button>
      )}
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPanelConsoleToolbarPlay)
