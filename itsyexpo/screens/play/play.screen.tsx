import Console from "@highvalley.systems/itsyexpo/components/console"
import Player from "@highvalley.systems/itsyexpo/components/player"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { DiskTabParamList } from "@highvalley.systems/itsyexpo/screens/disk"
import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs"
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { LayoutChangeEvent, LayoutRectangle, View } from "react-native"
import { connect } from "react-redux"
import styles from "./play.module.scss"

interface PlayScreenProps {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<DiskTabParamList, "Play">,
    StackNavigationProp<RootStackParamList>
  >
  disk: Disk
  route: RouteProp<DiskTabParamList, "Play">
}

const mapStateToProps = (state, ownProps) => ({
  disk: state.disks[ownProps.route.params.id],
})

const mapDispatchToProps = {}

export function PlayScreen({ disk, navigation, route }: PlayScreenProps) {
  console.log("Play")
  console.log(route)
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
        <Player disk={disk} />
      </View>
      <View style={styles.divider} />
      <View style={styles.console}>
        <Console disk={disk} />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)
