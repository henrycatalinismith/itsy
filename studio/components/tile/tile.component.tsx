import React from "react"
import { Svg, Defs, ClipPath, Path, Image as SvgImage } from "react-native-svg"
import { TouchableOpacity } from "react-native"
import { connect } from "react-redux"

import colors from "@highvalley.systems/palettes/pico8/original.es6"
import Font from "@itsy.studio/studio/components/font"
import styles from "@itsy.studio/studio/components/tile/tile.module.scss"

const mapStateToProps = (state, ownProps) => ({
  disk: state.disks[ownProps.id],
})

export function Tile({ disk, onPress, size }) {
  const dimensions = {
    width: size,
    height: size,
  }

  const diskSize = size / 2

  const bg = {
    backgroundColor: disk.active ? colors[12] : colors[6],
  }

  return (
    <TouchableOpacity style={[styles.tile, dimensions, bg]} onPress={onPress}>
      <Svg
        style={styles.disk}
        width={diskSize}
        height={diskSize}
        viewBox="0 0 16 16"
      >
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

        <SvgImage
          href={{ uri: `data:image/png;base64,${disk.snapshot}` }}
          x={1}
          y={1}
          width={14}
          height={14}
          clipPath="url(#shape)"
        />
      </Svg>

      <Font
        fontSize={15}
        color={colors[7]}
        borderColor={colors[1]}
        borderMultiplier={3}
        strokeMultiplier={0.9}
      >
        {disk.name}
      </Font>
    </TouchableOpacity>
  )
}

export default connect(mapStateToProps)(Tile)
