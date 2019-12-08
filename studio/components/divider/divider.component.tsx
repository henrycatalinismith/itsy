import React from "react"

import {
  View,
} from "react-native"

import styles from "./divider.module.scss"

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
