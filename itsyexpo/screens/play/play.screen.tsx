import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import PlayPanelConsole from "@highvalley.systems/itsyexpo/components/play-panel-console"
import PlayPanelScreen from "@highvalley.systems/itsyexpo/components/play-panel-screen"
import {
  PlayerState,
  selectPlayer,
} from "@highvalley.systems/itsyexpo/store/player"
import React from "react"
import { LayoutChangeEvent, LayoutRectangle, View } from "react-native"
import { connect } from "react-redux"
import styles from "./play.module.scss"

interface PlayScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Play">
  player: PlayerState
}

const mapStateToProps = (state) => ({
  player: selectPlayer(state),
})

const mapDispatchToProps = {}

export function PlayScreen({ player }: PlayScreenProps) {
  const [layout, setLayout] = React.useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout)
  }, [])

  const panelStyles = [styles.playPanel]
  const screenStyles = [styles.screen]

  if (layout.width > layout.height) {
    panelStyles.push(styles.landscape)
    screenStyles.push({ width: layout.height - 4 })
  } else {
    panelStyles.push(styles.portrait)
    screenStyles.push({ height: layout.width })
  }

  return (
    <View style={panelStyles} onLayout={onLayout}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)
