import { Svg } from "expo"

import React from "react"

import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { connect } from "react-redux"

import colors from "../constants/colors"
import select from "../selectors"

const mapStateToProps = (state, ownProps) => ({
  disk: select.disks.from(state).byId(ownProps.id),
})

export default connect(mapStateToProps)(({
  disk,
  onPress,
  size,
}) => {

  const dimensions = {
    width: size,
    heigh: size,
  }

  return (
    <TouchableOpacity style={[styles.disk, dimensions]} onPress={onPress}>
      <Svg width={size} height={size} viewBox="0 0 17 17">
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
})

const styles = StyleSheet.create({
  disk: {
    backgroundColor: colors[6],
  },
})
