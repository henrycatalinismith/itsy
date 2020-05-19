import BrushIconPencil from "@highvalley.systems/itsydraw/components/brush-icon-pencil"
import ToolboxToolBrushMode, {
  ToolboxToolBrushModeProps,
} from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode"
import {
  BrushModes,
  BrushSizes,
  selectBrushSize,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import React from "react"
import { connect } from "react-redux"

interface ToolboxToolBrushModePencilProps {
  brushSize: BrushSizes
}

const mapStateToProps = (state) => ({
  brushSize: selectBrushSize(state),
})

const mapDispatchToProps = {}

export function ToolboxToolBrushModePencil({
  brushSize,
}: ToolboxToolBrushModePencilProps): React.ReactElement {
  const mode = BrushModes.Pencil
  const icon = <BrushIconPencil />
  const meta = <Pixlflip fontSize={16}>{`${brushSize}x`}</Pixlflip>

  const props: ToolboxToolBrushModeProps = {
    mode,
    icon,
    meta,
  }

  return <ToolboxToolBrushMode {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModePencil)
