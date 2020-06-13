import BrushIcon from "@highvalley.systems/itsydraw/components/brush-icon"
import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import {
  ToolIds,
  CircleBrushState,
  FillBrushState,
  LineBrushState,
  PasteBrushState,
  PencilBrushState,
  BrushModeState,
  selectActiveBrush,
} from "@highvalley.systems/itsydraw/store/tools"
import React from "react"
import { connect } from "react-redux"

interface ToolboxPickerButtonBrushProps {
  activeBrush: BrushModeState<
    | CircleBrushState
    | FillBrushState
    | LineBrushState
    | PasteBrushState
    | PencilBrushState
  >
}

const mapStateToProps = (state) => ({
  activeBrush: selectActiveBrush(state),
})

const mapDispatchToProps = {}

export function ToolboxPickerButtonBrush({
  activeBrush,
}: ToolboxPickerButtonBrushProps): React.ReactElement {
  return (
    <ToolboxPickerButton id={ToolIds.Brush}>
      <BrushIcon brush={activeBrush} />
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonBrush)
