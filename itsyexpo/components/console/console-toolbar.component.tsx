import { ButtonThemes } from "@highvalley.systems/itsyexpo/components/button"
import Toolbar, {
  ToolbarProps,
  ToolbarThemes,
} from "@highvalley.systems/itsyexpo/components/toolbar"
import {
  Disk,
  playDisk,
  stopDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import { clearOutput } from "@highvalley.systems/itsyexpo/store/output"
import {
  PlayerModes,
  selectPlayerMode,
} from "@highvalley.systems/itsyexpo/store/player"
import colors from "@highvalley.systems/palettes/fantasy8"
import React from "react"
import { Path, Svg } from "react-native-svg"
import { connect } from "react-redux"

interface ConsoleToolbarProps {
  disk: Disk
  playerMode: PlayerModes
  clearOutput: (id: string) => void
  playDisk: () => void
  stopDisk: () => void
}

const mapStateToProps = (state) => ({
  playerMode: selectPlayerMode(state),
})

const mapDispatchToProps = {
  clearOutput,
  playDisk,
  stopDisk,
}

export function ConsoleToolbar({
  disk,
  clearOutput,
  playerMode,
  playDisk,
  stopDisk,
}: ConsoleToolbarProps) {
  const buttons = []
  const theme = ToolbarThemes.PlayPanelConsole

  if (
    [PlayerModes.Load, PlayerModes.Busy, PlayerModes.Halt].includes(playerMode)
  ) {
    buttons.push({
      action: stopDisk,
      label: [
        <Svg key="svg" width={16} height={12} viewBox="0 0 48 48">
          <Path
            d="M4,4 L44,4 L44,44 L4,44 L4,4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={8}
            stroke={colors[1]}
            fill={colors[7]}
          />
        </Svg>,
        "stop",
      ],
      theme: ButtonThemes.Red,
    })
  } else {
    buttons.push({
      action: playDisk,
      label: [
        <Svg key="svg" width={16} height={16} viewBox="0 0 40 48">
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
            stroke={colors[1]}
            fill={colors[11]}
          />
        </Svg>,
        "play",
      ],
      theme: ButtonThemes.Blue,
    })
  }

  buttons.push({
    action: () => clearOutput(disk.id),
    label: "clear",
  })

  const toolbar: ToolbarProps = {
    buttons,
    theme,
  }

  return <Toolbar {...toolbar} />
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleToolbar)
