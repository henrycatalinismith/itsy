import React from "react"
import {
  StyleSheet,
  Text,
  View,
} from "react-native"

import Floppy from "./floppy"
import Font from "./font"
import colors from "../constants/colors"

export default () => {
  return (
    <View style={styles.container}>
      <Floppy size={18} style={styles.floppy} />
      <View style={styles.wordmark}>
        <Font
          fontSize={14}
          color={colors[15]}
          borderColor={colors[13]}
          borderMultiplier={2}
        >itsy</Font>

        <Font
          fontSize={14}
          color={colors[15]}
          borderColor={colors[13]}
          borderMultiplier={2}
        >studio</Font>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors[14],
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  floppy: {
    marginRight: 4,
  },
  wordmark: {
    display: "flex",
    flexDirection: "row",
  },
})
