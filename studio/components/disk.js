import { Svg } from "expo"
import React from "react"
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import colors from "../constants/colors"

const onPress = () => {}

export default () => {
  return (
    <TouchableOpacity style={styles.disk} onPress={onPress}>
      <Svg width="100" height="100" viewBox="0 0 17 17">
        <Svg.Path
          d={[
            "M1.5,1.5",
            "L14.5,1.5",
            "L14.5,3.5",
            "L16.5,3.5",
            "L16.5,16.5",
            "L1.5,16.5",
            "L1.5,1.5",
            "L14.5,1.5",
          ].join(" ")}
          stroke={colors[0]}
          fill={colors[12]}
        />
      </Svg>
      <Text>disk</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  disk: {
    backgroundColor: colors[6],
    height: 128,
    width: 128,
  },
})
