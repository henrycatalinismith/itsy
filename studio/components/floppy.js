import { Svg } from "expo"

import React from "react"

import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native"

import colors from "../constants/colors"

export default ({
  size = 23,
  bg = colors[12],
  onPress,
}) => {

  const styles = {
    width: size,
    height: size,
  }

  return (
    <TouchableHighlight style={styles} onPress={onPress}>
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

        <Svg.Rect
          id="Cover"
          fill={colors[6]}
          x={5}
          y={2}
          width={8}
          height={5}
        />

        <Svg.Rect
          id="Window"
          fill={bg}
          x={10}
          y={3}
          width={2}
          height={3}
        />

        <Svg.Rect
          id="Label"
          fill={colors[7]}
          x={4}
          y={8}
          width={10}
          height={7}
        />
      </Svg>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
  },
})



  /*
        <g transform="translate(-1.000000, -1.000000)" stroke="#000000" strokeLinecap="square">
          <path d="M1.5,1.5 L14.5,1.5" id="Line"></path>
          <path d="M14.5,3.5 L14.5,1.5" id="Line"></path>
          <path d="M16.5,3.5 L14.5,3.5" id="Line"></path>
          <path d="M1.5,16.5 L16.5,16.5" id="Line"></path>
          <path d="M1.5,2.5 L1.5,15.5" id="Line"></path>
          <path d="M16.5,16.5 L16.5,3.5" id="Line"></path>
        </g>
        */
