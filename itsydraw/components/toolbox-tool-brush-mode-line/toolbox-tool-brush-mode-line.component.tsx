import BrushIconLine from "@highvalley.systems/itsydraw/components/brush-icon-line"
import ToolboxToolBrushMode, {
  ToolboxToolBrushModeProps,
} from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode"
import {
  BrushModes,
  LineAngles,
  selectLineBrushAngle,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import React from "react"
import { connect } from "react-redux"

interface ToolboxToolBrushModeLineProps {
  lineAngle: LineAngles
}

const mapStateToProps = (state) => ({
  lineAngle: selectLineBrushAngle(state),
})

const mapDispatchToProps = {}

export function ToolboxToolBrushModeLine({
  lineAngle,
}: ToolboxToolBrushModeLineProps): React.ReactElement {
  const mode = BrushModes.Line
  const icon = <BrushIconLine />
  const meta = <Pixlflip fontSize={16}>{lineAngle}</Pixlflip>

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
)(ToolboxToolBrushModeLine)
