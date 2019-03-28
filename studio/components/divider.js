import React from "react"

import {
  Button,
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
    <>
      <View
        style={[styles.divider, styles[orientation]]}
        onResponderMove={onResponderMove}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}>
        <Button
          style={styles.play}
          title="▶️"
          onPress={() => {}}
        />
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
    width: 32,
  },
  portrait: {
    height: 32,
  },
  play: {
    fontSize: 24,
  },
})
