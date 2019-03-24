import React from "react"

import {
  StyleSheet,
  View,
} from "react-native"

import colors from "../constants/colors"

export default ({
  orientation,
  onMove,
}) => {
  const onResponderMove = ({ nativeEvent }) => onMove(
    nativeEvent.pageX,
    nativeEvent.pageY
  )

  return (
    <View
      style={[styles.divider, styles[orientation]]}
      onResponderMove={onResponderMove}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
    />
  )
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors[14],
  },
  landscape: {
    width: 6,
  },
  portrait: {
    height: 4,
  },
})
