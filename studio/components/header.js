import React from "react"
import {
  TouchableOpacity,
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
  disk,
  navigation,
}) => {

  const activeIndex = navigation.state.index
  const activeRoute = navigation.state.routes[activeIndex]
  const activeScreen = activeRoute.routeName

  const title = ({
    Home: () => "itsy studio!!",
    Disk: () => activeRoute.params.disk.name,
    Code: () => activeRoute.params.disk.name,
    Help: () => "itsy studio",
  })[activeScreen]()

  const onHelp = () => {
    if (activeScreen !== "Help") {
      navigation.navigate("Help", {})
    } else {
      console.log("goBack")
      navigation.pop()
    }
  }

  const helpStyle = activeScreen === "Help" ? styles.back : styles.help
  const helpText = activeScreen === "Help" ? "done" : "help"

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
          <TouchableOpacity style={helpStyle} onPress={onHelp}>
            <Font
              fontSize={15}
              color={colors[7]}
              borderColor={colors[1]}
              borderMultiplier={3}
              strokeMultiplier={0.9}
            >{helpText}</Font>
          </TouchableOpacity>
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

  help: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors[12],
    borderColor: colors[5],
    borderWidth: 2,
    padding: 2,
    paddingBottom: 4,
    width: 64,
    marginRight: 4,
  },

  back: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors[8],
    borderColor: colors[5],
    borderWidth: 2,
    padding: 2,
    paddingBottom: 4,
    width: 64,
    marginRight: 4,
  },

})
