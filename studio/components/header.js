import React from "react"
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"

import Floppy from "./floppy"
import Font from "./font"
import colors from "../constants/colors"

export default ({
  children,
  disk,
  navigation,
}) => {

  const activeIndex = navigation.state.index
  const activeRoute = navigation.state.routes[activeIndex]
  const activeScreen = activeRoute.routeName

  const title = ({
    Home: () => "itsy studio",
    Code: () => activeRoute.params.disk.name,
  })[activeScreen]()
  console.log(navigation)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors[2]}
        barStyle="light-content"
      />
      <View style={styles.inside}>
        <View style={styles.left}>
          <Floppy size={18} style={styles.floppy} />
          <View style={styles.wordmark}>
            <Font
              fontSize={15}
              color={colors[7]}
              borderColor={colors[0]}
              borderMultiplier={3}
              strokeMultiplier={0.9}
            >{title}</Font>
          </View>
        </View>
        <View style={styles.right}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors[1],
    display: "flex",
  },
  inside: {
    backgroundColor: colors[14],
    display: "flex",
    height: 32,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderTopColor: colors[2],
    borderTopWidth: 2,
    borderRightColor: colors[2],
    borderLeftColor: colors[2],
    borderLeftWidth: 2,
    borderRightWidth: 2,

  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
  },
  right: {
  },
  floppy: {
  },
  wordmark: {
    display: "flex",
    flexDirection: "row",
  },
})
