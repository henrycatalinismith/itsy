import { Svg, ClipPath, Defs, Path, Image as SvgImage } from "react-native-svg"

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

import colors from "../../constants/colors"
import select from "../../selectors"

export default ({ disk, edit, size }) => {

  const dimensions = {
    width: size,
    height: size,
  }

  const diskSize = size / 2

  return (
    <Svg style={styles.disk} width={diskSize} height={diskSize} viewBox="0 0 16 16">

      <Defs>
        <ClipPath id="shape">
          <Path
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
        </ClipPath>
      </Defs>

      <Path
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
        <SvgImage
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
  disk: {
    marginBottom: 8,
    marginTop: 8,
  },
})
