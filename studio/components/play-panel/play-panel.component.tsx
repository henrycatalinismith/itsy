import React from "react"
import { LayoutRectangle, View } from "react-native"
import { connect } from "react-redux"
import Console from "@itsy.studio/studio/components/console"
import PlayerControls from "@itsy.studio/studio/components/player-controls"
import Screen from "@itsy.studio/studio/components/screen"
import LayoutContext from "@itsy.studio/studio/contexts/layout"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "./play-panel.module.scss"

interface PlayPanelProps {
  player: PlayerState
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function PlayPanel({ player, screen }: PlayPanelProps) {
  const panelLayout = React.useContext<LayoutRectangle>(LayoutContext)

  const [consoleText, setConsoleText] = React.useState("console\n")

  const appendConsoleText = (text) => {
    setConsoleText(`${consoleText}\n${text}`)
  }

  const panelStyles = [styles.playPanel]

  const screenHeight: { [k: string]: any } = {}
  const screenStyles = [styles.screen]

  if (panelLayout.width > panelLayout.height) {
    panelStyles.push(styles.landscape)
    screenStyles.push({ width: panelLayout.height - 4 })
  } else {
    panelStyles.push(styles.portrait)
    screenStyles.push({ height: panelLayout.width - 4 })
  }

  return (
    <View style={panelStyles}>
      <View style={screenStyles}>
        <Screen appendConsoleText={appendConsoleText} />
      </View>
      <View style={styles.controls}>
        <PlayerControls />
      </View>
      <View style={styles.console}>
        <Console text={consoleText} />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanel)
