import { Svg } from "expo"

import React from "react"

import {
  Button,
  Image,
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
  edit: select.edits.from(state).forHome(ownProps.id),
})

export default connect(mapStateToProps)(({
  disk,
  edit,
  onPress,
  size,
}) => {

  const dimensions = {
    width: size,
    height: size,
  }

  const diskSize = size / 2
  console.log(edit.snapshot)

  return (
    <TouchableOpacity style={[styles.tile, dimensions]} onPress={onPress}>
      <Svg style={styles.disk} width={diskSize} height={diskSize} viewBox="0 0 17 17">

        <Svg.Defs>
          <Svg.ClipPath id="shape">
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
            />
          </Svg.ClipPath>
        </Svg.Defs>

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

        {edit && (
          <Svg.Image
            href={{ uri: edit.snapshot }}
            x={0}
            y={0}
            width={17}
            height={17}
            clipPath="url(#shape)"
          />
        )}
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
