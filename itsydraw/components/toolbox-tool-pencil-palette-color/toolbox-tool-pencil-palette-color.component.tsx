import {
  changeBrushColor,
  selectBrushColor,
  selectPalette,
} from "@highvalley.systems/itsydraw/store/tools"
import { PaletteColor, PaletteIndex } from "@highvalley.systems/typedefs/itsy"
import { RectConfig } from "konva/types/shapes/Rect"
import React from "react"
import { Rect } from "react-konva"
import { connect } from "react-redux"

interface ToolboxToolPencilPaletteColorProps {
  id: PaletteIndex
  color: PaletteColor
  brushColor: PaletteColor
  changeBrushColor: (i: PaletteIndex) => void
  x: number
  y: number
  size: number
}

const mapStateToProps = (state, ownProps) => ({
  color: selectPalette(state)[ownProps.id],
  brushColor: selectBrushColor(state),
})

const mapDispatchToProps = {
  changeBrushColor,
}

export function ToolboxToolPencilPaletteColor({
  brushColor,
  changeBrushColor,
  id,
  color,
  x,
  y,
  size,
}: ToolboxToolPencilPaletteColorProps): React.ReactElement {
  const active = brushColor.id === parseInt(id.toString(), 10)
  const onClick = React.useCallback(() => {
    changeBrushColor(id)
  }, [])

  const props: RectConfig = {
    x,
    y,
    width: size,
    height: size,
    fill: color.hex,
    onClick,
    onTap: onClick,
    onTouchMove: onClick,
  }

  const rect = <Rect {...props} />

  if (active) {
    return (
      <>
        {rect}
        <Rect
          x={x + 0}
          y={y + 0}
          width={size - 1}
          height={size - 1}
          stroke="white"
          strokeWidth={2}
        />
        <Rect
          x={x + 2}
          y={y + 2}
          width={size - 5}
          height={size - 5}
          stroke="black"
          strokeWidth={2}
        />
      </>
    )
  }

  return rect
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolPencilPaletteColor)
