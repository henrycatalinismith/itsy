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
      <Font
        fontSize={18}
        color={colors[7]}
        borderColor={colors[13]}
        borderMultiplier={1.5}
      >itsy</Font>
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
})
