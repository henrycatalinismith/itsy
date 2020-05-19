import BrushIconCircle from "@highvalley.systems/itsydraw/components/brush-icon-circle"
import BrushIconLine from "@highvalley.systems/itsydraw/components/brush-icon-line"
import BrushIconPencil from "@highvalley.systems/itsydraw/components/brush-icon-pencil"
import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import {
  ToolIds,
  BrushModes,
  BrushSizes,
  selectActiveBrushMode,
  selectBrushColor,
  selectBrushSize,
} from "@highvalley.systems/itsydraw/store/tools"
import { PaletteColor } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"

interface ToolboxPickerButtonBrushProps {
  brushMode: BrushModes
  brushSize: BrushSizes
  brushColor: PaletteColor
}

const mapStateToProps = (state) => ({
  brushColor: selectBrushColor(state),
  brushMode: selectActiveBrushMode(state),
  brushSize: selectBrushSize(state),
})

const mapDispatchToProps = {}

export function ToolboxPickerButtonBrush({
  brushColor,
  brushMode,
  brushSize,
}: ToolboxPickerButtonBrushProps): React.ReactElement {
  return (
    <ToolboxPickerButton id={ToolIds.Brush}>
      {brushMode === BrushModes.Circle && <BrushIconCircle />}
      {brushMode === BrushModes.Line && <BrushIconLine />}
      {brushMode === BrushModes.Pencil && (
        <BrushIconPencil size={brushSize} color={brushColor.hex} />
      )}
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonBrush)
