import React from "react"
import { TouchableHighlight } from "react-native"
import { Svg, Rect } from "react-native-svg"

import colors from "@highvalley.systems/palettes/pico8/original.es6"

export function Floppy({ size = 23, onPress = () => {} }) {
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
}

export default Floppy
