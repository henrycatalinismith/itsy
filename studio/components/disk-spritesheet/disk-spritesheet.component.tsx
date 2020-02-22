import React from "react"
import { Svg, Defs, ClipPath, Path, Image as SvgImage } from "react-native-svg"
import { connect } from "react-redux"
import { Disk } from "@itsy.studio/studio/store/disks"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import styles from "./disk-spritesheet.module.scss"

interface DiskSpritesheetProps {
  id: string
  disk: Disk
  size: number
}

const mapStateToProps = (state, { id }) => ({
  disk: state.disks[id],
})

const mapDispatchToProps = {}

export function DiskSpritesheet({ disk, size }: DiskSpritesheetProps) {
  return (
    <Svg style={styles.disk} width={size} height={size} viewBox="0 0 16 16">
      <SvgImage
        href={{ uri: `data:image/png;base64,${disk.spritesheet}` }}
        x={0}
        y={0}
        width={16}
        height={16}
      />
    </Svg>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskSpritesheet)
