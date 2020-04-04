import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { Image as SvgImage, Svg } from "react-native-svg"
import { connect } from "react-redux"
import styles from "./disk-panel-inspector-spritesheet.module.scss"

interface DiskPanelInspectorSpritesheetProps {
  id: string
  disk: Disk
  size: number
}

const mapStateToProps = (state, { id }) => ({
  disk: state.disks[id],
})

const mapDispatchToProps = {}

export function DiskPanelInspectorSpritesheet({
  disk,
  size,
}: DiskPanelInspectorSpritesheetProps) {
  return (
    <Svg
      style={styles.component}
      width={size}
      height={size}
      viewBox="0 0 16 16"
    >
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelInspectorSpritesheet)
