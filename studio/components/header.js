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

export default ({ children }) => {
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
              fontSize={16}
              color={colors[7]}
              borderColor={colors[13]}
              strokeMultiplier={0.9}
              borderMultiplier={2}
            >itsy</Font>

            <Font
              fontSize={16}
              color={colors[7]}
              borderColor={colors[13]}
              strokeMultiplier={0.9}
              borderMultiplier={2}
            >studio</Font>
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
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
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
