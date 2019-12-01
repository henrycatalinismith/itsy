import React from "react"

import { Svg } from "expo"

import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"

import colors from "../constants/colors"

export default ({
  children,
  orientation,
  onMove,
}) => {
  const onResponderMove = ({ nativeEvent }) => onMove(
    nativeEvent.pageX,
    nativeEvent.pageY
  )

  return (
    <>
      <View
        style={[styles.divider, styles[orientation]]}
        onResponderMove={onResponderMove}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}>
        {children}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors[14],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  landscape: {
    width: 4,
  },
  portrait: {
    height: 4,
  },
  play: {
    fontSize: 24,
  },
})
