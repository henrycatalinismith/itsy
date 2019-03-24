import React from "react"

import {
  StyleSheet,
  View,
} from "react-native"

import colors from "../constants/colors"

export default ({ orientation }) => {
  return (
    <View style={[styles.divider, styles[orientation]]}>
    </View>
  )
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors[14],
  },
  landscape: {
    width: 4,
  },
  portrait: {
    height: 4,
  },
})
