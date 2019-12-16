import React from "react"
import { TouchableOpacity } from "react-native"
import { Svg, Path } from "react-native-svg"
import { connect } from "react-redux"

import { play } from "@itsy.studio/studio/store/editor"
import colors from "@itsy.studio/palettes/pico8/original.es6"

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  play,
}

export function Play({ play }) {
  return (
    <>
      <TouchableOpacity onPress={play}>
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
            fill={colors[11]}
          />
        </Svg>
      </TouchableOpacity>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
