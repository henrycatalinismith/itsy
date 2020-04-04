import PlayPanelConsole from "@highvalley.systems/itsyexpo/components/play-panel-console"
import PlayPanelScreen from "@highvalley.systems/itsyexpo/components/play-panel-screen"
import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import {
  playerSelector,
  PlayerState,
} from "@highvalley.systems/itsyexpo/store/player"
import {
  ScreenState,
  selectScreen,
} from "@highvalley.systems/itsyexpo/store/screen"
import React from "react"
import { LayoutRectangle, View } from "react-native"
import { connect } from "react-redux"
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

  const panelStyles = [styles.playPanel]

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
        <PlayPanelScreen />
      </View>
      <View style={styles.divider} />
      <View style={styles.console}>
        <PlayPanelConsole />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanel)
