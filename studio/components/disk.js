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
    height: size,
  }

  const diskSize = size / 2

  return (
    <TouchableOpacity style={[styles.tile, dimensions]} onPress={onPress}>
      <Svg style={styles.disk} width={diskSize} height={diskSize} viewBox="0 0 17 17">
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
      <Text style={styles.label}>
        {disk.name}
      </Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors[6],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  disk: {
    marginBottom: 8,
    marginTop: 8,
  },
  label: {
    fontFamily: "overpass-mono-bold",
  }
})
