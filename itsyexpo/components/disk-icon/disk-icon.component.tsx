import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import colors from "@highvalley.systems/palettes/fantasy8"
import React from "react"
import { TouchableHighlight } from "react-native"
import {
  ClipPath,
  Defs,
  Image as SvgImage,
  Path,
  Svg,
  G,
} from "react-native-svg"
import { connect } from "react-redux"
import styles from "./disk-icon.module.scss"

export enum DiskIconActions {
  None = "None",
  Play = "Play",
}

export interface DiskIconProps {
  disk: Disk
  size: number
  action?: DiskIconActions
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function DiskIcon({
  disk,
  size,
  action = DiskIconActions.None,
}: DiskIconProps) {
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

      {action === DiskIconActions.Play && (
        <G transform={{ translateX: 5, translateY: 4 }}>
          <Path
            d="M0,0 L6,4 L0,8 L0,0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.9}
            stroke={colors[7]}
            fill={colors[12]}
          />
          <Path
            d="M0,0 L6,4 L0,8 L0,0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            stroke={colors[1]}
            fill={colors[11]}
          />
        </G>
      )}
    </Svg>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskIcon)
