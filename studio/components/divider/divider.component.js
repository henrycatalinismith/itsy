import React from "react"

import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"

import styles from "./divider.module.scss"
import colors from "../../constants/colors"

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
