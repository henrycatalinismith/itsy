import _ from "lodash"
import React from "react"
import { Stage, Layer, Rect } from "react-konva"
import { connect } from "react-redux"
import {
  PaletteIndex,
  PaletteState,
  selectPalette,
} from "@itsy.studio/graphics/store/palette"
import {
  SpritesheetPixelIndex,
  SpritesheetState,
  selectSpritesheet,
} from "@itsy.studio/graphics/store/spritesheet"
import styles from "./spritesheet.module.scss"

interface SpritesheetProps {
  palette: PaletteState
  spritesheet: SpritesheetState
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
  spritesheet: selectSpritesheet(state),
})

const mapDispatchToProps = {}

export function Spritesheet({
  palette,
  spritesheet,
}: SpritesheetProps): React.ReactElement {
  const size = window.innerWidth
  const scale = (window.innerWidth / 128) * 2
  return (
    <Stage width={size} height={size}>
      <Layer scale={{ x: scale, y: scale }}>
        {_.map(spritesheet, (column, x: SpritesheetPixelIndex) =>
          _.map(column, (pixel: PaletteIndex, y: SpritesheetPixelIndex) => (
            <Rect
              key={`${x}-${y}`}
              x={parseInt(x.toString(), 10)}
              y={parseInt(y.toString(), 10)}
              width={1}
              height={1}
              fill={palette[pixel].hex}
            />
          ))
        )}
      </Layer>
    </Stage>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
