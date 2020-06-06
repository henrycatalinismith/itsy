import BrushIconPaste from "@highvalley.systems/itsydraw/components/brush-icon-paste"
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

interface ToolboxToolBrushModePasteProps {
  brushSize: BrushSizes
  brushColor: PaletteColor
}

const mapStateToProps = (state) => ({
  brushSize: selectBrushSize(state),
  brushColor: selectBrushColor(state),
})

const mapDispatchToProps = {}

export function ToolboxToolBrushModePaste({
  brushColor,
  brushSize,
}: ToolboxToolBrushModePasteProps): React.ReactElement {
  const mode = BrushModes.Paste
  const icon = <BrushIconPaste />
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
)(ToolboxToolBrushModePaste)
