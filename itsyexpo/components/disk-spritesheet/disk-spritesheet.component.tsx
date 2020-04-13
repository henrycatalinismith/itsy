import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { Image as SvgImage, Svg, SvgProps } from "react-native-svg"
import { connect } from "react-redux"
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
  const style = styles.component
  const width = size
  const height = size
  const viewBox = "0 0 16 16"

  const svg: SvgProps = { style, width, height, viewBox }

  return (
    <Svg {...svg}>
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
