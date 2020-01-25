import React from "react"
import { Svg, Defs, ClipPath, Path, Image as SvgImage } from "react-native-svg"
import { connect } from "react-redux"
import { Disk } from "@itsy.studio/studio/store/disks"
import colors from "@itsy.studio/palettes/pico8/original.es6"
import styles from "./disk-icon.module.scss"

interface DiskIconProps {
  id: string
  disk: Disk
  size: number
}

const mapStateToProps = (state, { id }) => ({
  disk: state.disks[id],
})

const mapDispatchToProps = {}

export function DiskIcon({ disk, size }: DiskIconProps) {
  return (
    <Svg style={styles.disk} width={size} height={size} viewBox="0 0 16 16">
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
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskIcon)
