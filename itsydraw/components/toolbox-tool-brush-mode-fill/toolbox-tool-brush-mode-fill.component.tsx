import BrushIconFill from "@highvalley.systems/itsydraw/components/brush-icon-fill"
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

interface ToolboxToolBrushModeFillProps {
  brushSize: BrushSizes
  brushColor: PaletteColor
}

const mapStateToProps = (state) => ({
  brushSize: selectBrushSize(state),
  brushColor: selectBrushColor(state),
})

const mapDispatchToProps = {}

export function ToolboxToolBrushModeFill({
  brushColor,
  brushSize,
}: ToolboxToolBrushModeFillProps): React.ReactElement {
  const mode = BrushModes.Fill
  const icon = <BrushIconFill color={brushColor.hex} size={brushSize} />
  const meta = <></>

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
)(ToolboxToolBrushModeFill)
