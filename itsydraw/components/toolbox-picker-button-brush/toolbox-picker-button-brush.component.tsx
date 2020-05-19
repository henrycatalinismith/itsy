import BrushIconCircle from "@highvalley.systems/itsydraw/components/brush-icon-circle"
import BrushIconLine from "@highvalley.systems/itsydraw/components/brush-icon-line"
import BrushIconPencil from "@highvalley.systems/itsydraw/components/brush-icon-pencil"
import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import {
  ToolIds,
  BrushModes,
  selectActiveBrushMode,
} from "@highvalley.systems/itsydraw/store/tools"
import React from "react"
import { connect } from "react-redux"

interface ToolboxPickerButtonBrushProps {
  brushMode: BrushModes
}

const mapStateToProps = (state) => ({
  brushMode: selectActiveBrushMode(state),
})

const mapDispatchToProps = {}

export function ToolboxPickerButtonBrush({
  brushMode,
}: ToolboxPickerButtonBrushProps): React.ReactElement {
  return (
    <ToolboxPickerButton id={ToolIds.Brush}>
      {brushMode === BrushModes.Circle && <BrushIconCircle />}
      {brushMode === BrushModes.Line && <BrushIconLine />}
      {brushMode === BrushModes.Pencil && <BrushIconPencil />}
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonBrush)
