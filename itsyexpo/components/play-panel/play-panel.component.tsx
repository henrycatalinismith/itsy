import PlayPanelConsole from "@highvalley.systems/itsyexpo/components/play-panel-console"
import PlayPanelScreen from "@highvalley.systems/itsyexpo/components/play-panel-screen"
import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import {
  PanelAvailabilities,
  selectPlayPanelAvailability,
} from "@highvalley.systems/itsyexpo/store/panels"
import {
  PlayerState,
  selectPlayer,
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
  playPanelAvailability: PanelAvailabilities
  player: PlayerState
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  playPanelAvailability: selectPlayPanelAvailability(state),
  player: selectPlayer(state),
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function PlayPanel({
  playPanelAvailability,
  player,
  screen,
}: PlayPanelProps) {
  const panelLayout = React.useContext<LayoutRectangle>(LayoutContext)
  const panelStyles = [styles.playPanel]
  const screenStyles = [styles.screen]

  if (panelLayout.width > panelLayout.height) {
    panelStyles.push(styles.landscape)
    screenStyles.push({ width: panelLayout.height - 4 })
  } else {
    panelStyles.push(styles.portrait)
    screenStyles.push({ height: panelLayout.width })
  }

  if (playPanelAvailability === PanelAvailabilities.Unavailable) {
    return <></>
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
