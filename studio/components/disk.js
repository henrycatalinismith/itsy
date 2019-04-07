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

import Font from "./font"

import colors from "../constants/colors"
import select from "../selectors"

export default ({ disk, edit, size }) => {

  const dimensions = {
    width: size,
    height: size,
  }

  const diskSize = size / 2

  return (
    <Svg style={styles.disk} width={diskSize} height={diskSize} viewBox="0 0 16 16">

      <Svg.Defs>
        <Svg.ClipPath id="shape">
          <Svg.Path
            d={[
              "M1.5,1.5",
              "L12.5,1.5",
              "L12.5,3.5",
              "L14.5,3.5",
              "L14.5,14.5",
              "L1.5,14.5",
              "L1.5,1.5",
              "L12.5,1.5",
            ].join(" ")}
          />
        </Svg.ClipPath>
      </Svg.Defs>

      <Svg.Path
        d={[
          "M1,1",
          "L13,1",
          "L13,3",
          "L15,3",
          "L15,15",
          "L1,15",
          "L1,1",
          "L13,1",
        ].join(" ")}
        stroke={colors[0]}
        strokeWidth={1}
        fill={colors[12]}
      />

      {edit && (
        <Svg.Image
          href={{ uri: edit.snapshot }}
          x={1}
          y={1}
          width={14}
          height={14}
          clipPath="url(#shape)"
        />
      )}
    </Svg>
  )
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors[6],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderTopColor: colors[13],
    borderRightColor: colors[13],
    borderBottomColor: colors[13],
    borderLeftColor: colors[13],
    overflow: "hidden",
  },
  disk: {
    marginBottom: 8,
    marginTop: 8,
  },
  label: {
    fontFamily: "overpass-mono-bold",
  }
})
