import { Svg, ClipPath, Defs, Path, Image as SvgImage } from "react-native-svg"
import React from "react"

import { connect } from "react-redux"

import colors from "@itsy.studio/palettes/pico8/original.es6"
import select from "../../selectors"

const mapStateToProps = (state, ownProps) => {
  const diskId = ownProps.id
  const disk = state.disks[diskId]
  return {
    disk,
  }
}

export function Disk ({ disk, size }) {
  const dimensions = {
    width: size,
    height: size,
  }

  const diskSize = size / 2

  return (
    <Svg width={diskSize} height={diskSize} viewBox="0 0 16 16">

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
        href={{ uri: disk.snapshot }}
        x={1}
        y={1}
        width={14}
        height={14}
        clipPath="url(#shape)"
      />
    </Svg>
  )
}

export default connect(mapStateToProps)(Disk)
