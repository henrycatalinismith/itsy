import React from "react"

import { Svg } from "expo"

import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"

import colors from "../constants/colors"

export default () => {
  return (
    <>
      <TouchableOpacity onPress={() => {}}>
        <Svg width={40} height={48} viewBox="0 0 40 48">
           <Svg.Path
            d="M8,8 L32,24 L8,40 L8,8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={8}
            stroke={colors[1]}
          />
          <Svg.Path
            d="M8,8 L32,24 L8,40 L8,8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            stroke={colors[3]}
            fill={colors[11]}
          />
        </Svg>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
})

