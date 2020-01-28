import React from "react"
import { Rect } from "react-konva"
import { connect } from "react-redux"
import {
  PaletteIndex,
  PaletteColor,
  selectPalette,
} from "@itsy.studio/graphics/store/palette"
import {
  SpritesheetPixelIndex,
  selectSpritesheet,
} from "@itsy.studio/graphics/store/spritesheet"

interface PixelProps {
  x: SpritesheetPixelIndex
  y: SpritesheetPixelIndex
  color: PaletteColor
}

const mapStateToProps = (state, { x, y }) => ({
  color: selectPalette(state)[selectSpritesheet(state)[x][y]],
})

const mapDispatchToProps = {}

export function Pixel({ x, y, color }: PixelProps): React.ReactElement {
  const rect = {
    x: parseInt(x.toString(), 10),
    y: parseInt(y.toString(), 10),
    width: 1,
    height: 1,
    fill: color.hex,
  }

  return <Rect {...rect} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Pixel)
