import BrushIconCircle from "@highvalley.systems/itsydraw/components/brush-icon-circle"
import ToolboxToolBrushMode, {
  ToolboxToolBrushModeProps,
} from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode"
import {
  BrushModes,
  CircleStyles,
  selectCircleBrushStyle,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import React from "react"
import { connect } from "react-redux"

interface ToolboxToolBrushModeCircleProps {
  circleStyle: CircleStyles
}

const mapStateToProps = (state) => ({
  circleStyle: selectCircleBrushStyle(state),
})

const mapDispatchToProps = {}

export function ToolboxToolBrushModeCircle({
  circleStyle,
}: ToolboxToolBrushModeCircleProps): React.ReactElement {
  const mode = BrushModes.Circle
  const icon = <BrushIconCircle />
  const meta = <Pixlflip fontSize={16}>{circleStyle}</Pixlflip>

  const props: ToolboxToolBrushModeProps = {
    icon,
    meta,
    mode,
  }

  return <ToolboxToolBrushMode {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeCircle)
