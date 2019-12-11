import React from "react"
import { TouchableOpacity } from "react-native"
import { Svg, Path } from "react-native-svg"

import colors from "@itsy.studio/palettes/pico8/original.es6"
import styles from "./stop.module.scss"

export function Stop({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width={26} height={32} viewBox="0 0 40 48">
          <Path
          d="M8,8 L32,24 L8,40 L8,8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={8}
          stroke={colors[1]}
        />
        <Path
          d="M8,8 L32,24 L8,40 L8,8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          stroke={colors[3]}
          fill={colors[8]}
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default Stop
