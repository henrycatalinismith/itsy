import React from "react"
import {
  StyleSheet,
  Text,
  View,
} from "react-native"

import colors from "../constants/colors"

export default () => {
  return (
    <View style={styles.container}>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors[14],
    height: 32,
  },
})
