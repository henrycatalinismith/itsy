import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import {
  activatePencilColor,
  PencilState,
  selectPencil,
} from "@highvalley.systems/itsydraw/store/pencil"
import { PaletteColor, PaletteIndex } from "@highvalley.systems/typedefs/itsy"
import { RectConfig } from "konva/types/shapes/Rect"
import React from "react"
import { Rect } from "react-konva"
import { connect } from "react-redux"

interface ToolboxToolPencilPaletteColorProps {
  id: PaletteIndex
  color: PaletteColor
  activatePencilColor: (i: PaletteIndex) => void
  x: number
  y: number
  size: number
  pencil: PencilState
}

const mapStateToProps = (state, ownProps) => ({
  pencil: selectPencil(state),
  color: selectPalette(state)[ownProps.id],
})

const mapDispatchToProps = {
  activatePencilColor,
}

export function ToolboxToolPencilPaletteColor({
  activatePencilColor,
  id,
  color,
  x,
  y,
  size,
  pencil,
}: ToolboxToolPencilPaletteColorProps): React.ReactElement {
  const active =
    parseInt(pencil.color.toString(), 10) === parseInt(id.toString(), 10)
  const onClick = React.useCallback(() => {
    activatePencilColor(id)
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
