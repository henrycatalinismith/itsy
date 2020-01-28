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
  drawPixel,
  selectSpritesheet,
} from "@itsy.studio/graphics/store/spritesheet"

interface PixelProps {
  x: SpritesheetPixelIndex
  y: SpritesheetPixelIndex
  color: string
  drawPixel: () => void
}

const mapStateToProps = (_, i) => (state) => {
  return {}
  // console.log('mstp')
  // return {
  // color: state.palette[state.spritesheet[i.x][i.y]].hex,
  // }
}

const mapDispatchToProps = (_, ownProps) => {
  let dispatchProps
  return (dispatch) => {
    if (!dispatchProps) {
      dispatchProps = {
        drawPixel: () => {
          // console.log(`draw ${ownProps.x} ${ownProps.y}`)
          dispatch(drawPixel(ownProps.x, ownProps.y))
        },
      }
    }
    return dispatchProps
  }
}

export function Pixel({
  x,
  y,
  color,
  drawPixel,
}: PixelProps): React.ReactElement {
  console.log("r")
  return React.useMemo(() => {
    const rect = {
      x: parseInt(x.toString(), 10),
      y: parseInt(y.toString(), 10),
      width: 1,
      height: 1,
      fill: color,
      onMouseEnter: drawPixel,
    }

    return <Rect {...rect} />
  }, [color])
}

export default connect(undefined, mapDispatchToProps)(Pixel)
