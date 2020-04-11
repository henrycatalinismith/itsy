import { playDisk, stopDisk } from "@highvalley.systems/itsyexpo/store/disks"
import { clearOutput } from "@highvalley.systems/itsyexpo/store/output"
import {
  playerSelector,
  PlayerState,
} from "@highvalley.systems/itsyexpo/store/player"
import Toolbar, {
  ToolbarProps,
  ToolbarThemes,
} from "@highvalley.systems/itsyexpo/components/toolbar"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import { Path, Svg } from "react-native-svg"
import React from "react"
import { connect } from "react-redux"

interface PlayPanelConsoleToolbarProps {
  player: PlayerState
  clearOutput: () => void
  playDisk: () => void
  stopDisk: () => void
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {
  clearOutput,
  playDisk,
  stopDisk,
}

export function PlayPanelConsoleToolbar({
  clearOutput,
  player,
  playDisk,
  stopDisk,
}: PlayPanelConsoleToolbarProps) {
  const buttons = []
  const theme = ToolbarThemes.PlayPanelConsole

  if (player.running || player.waiting || player.stopping) {
    buttons.push({
      action: stopDisk,
      label: [
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
        </Svg>,
        "stop",
      ],
    })
  } else {
    buttons.push({
      action: playDisk,
      label: [
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
        </Svg>,
        "play",
      ],
    })
  }

  buttons.push({
    action: clearOutput,
    label: "clear",
  })

  const toolbar: ToolbarProps = {
    buttons,
    theme,
  }

  return <Toolbar {...toolbar} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPanelConsoleToolbar)
