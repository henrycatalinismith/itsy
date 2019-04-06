import React from "react"
import {
  StyleSheet,
  Text,
  View,
} from "react-native"

import Floppy from "./floppy"
import Font from "./font"
import colors from "../constants/colors"

export default ({ children }) => {
  return (
    <View style={styles.container}>
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
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors[14],
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
