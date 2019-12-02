import { Svg, Rect } from "react-native-svg"

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
      <Svg width={size} height={size} viewBox="0 0 6 6">
        <Rect fill={colors[12]} x={1} y={1} width={4} height={4} />
        <Rect fill={colors[0]} x={0} y={0} width={5} height={1} />
        <Rect fill={colors[0]} x={4} y={0} width={1} height={2} />
        <Rect fill={colors[0]} x={4} y={1} width={2} height={1} />
        <Rect fill={colors[0]} x={0} y={0} width={1} height={5} />
        <Rect fill={colors[0]} x={0} y={5} width={5} height={1} />
        <Rect fill={colors[0]} x={5} y={1} width={1} height={5} />
        <Rect fill={colors[6]} x={2} y={1} width={2} height={1} />
        <Rect fill={colors[7]} x={2} y={3} width={2} height={2} />
      </Svg>
    </TouchableHighlight>
  )

  /*
  return (

        <Svg.Path
          d={[
            "M1,1",
            "L4,1",
            "L4,2",
            "L5,2",
            "L5,5",
            "L1,5",
            "L1,1",
            "L4,1",
          ].join(" ")}
          stroke={colors[0]}
          strokeWidth={1}
          fill={colors[12]}
        />
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
  */
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
