import BrushIconPencil from "@highvalley.systems/itsydraw/components/brush-icon-pencil"
import ToolboxToolBrushMode, {
  ToolboxToolBrushModeProps,
} from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode"
import {
  BrushModes,
  BrushSizes,
  selectBrushColor,
  selectBrushSize,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import { PaletteColor } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"

interface ToolboxToolBrushModePencilProps {
  brushSize: BrushSizes
  brushColor: PaletteColor
}

const mapStateToProps = (state) => ({
  brushSize: selectBrushSize(state),
  brushColor: selectBrushColor(state),
})

const mapDispatchToProps = {}

export function ToolboxToolBrushModePencil({
  brushColor,
  brushSize,
}: ToolboxToolBrushModePencilProps): React.ReactElement {
  const mode = BrushModes.Pencil
  const icon = <BrushIconPencil color={brushColor.hex} size={brushSize} />
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
