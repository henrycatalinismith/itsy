import ToolboxToolBrushModeOptionsCircle from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-options-circle"
import ToolboxToolBrushModeOptionsLine from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-options-line"
import ToolboxToolBrushModeOptionsPencil from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-options-pencil"
import {
  BrushModes,
  selectActiveBrushMode,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-options.module.scss"

interface ToolboxToolBrushModeOptionsProps {
  brushMode: BrushModes
}

const mapStateToProps = (state) => ({
  brushMode: selectActiveBrushMode(state),
})

const mapDispatchToProps = {}

const modeComponentMap: { [key in BrushModes]: React.ReactElement } = {
  [BrushModes.Circle]: <ToolboxToolBrushModeOptionsCircle />,
  [BrushModes.Line]: <ToolboxToolBrushModeOptionsLine />,
  [BrushModes.Pencil]: <ToolboxToolBrushModeOptionsPencil />,
}

export function ToolboxToolBrushModeOptions({
  brushMode,
}: ToolboxToolBrushModeOptionsProps): React.ReactElement {
  return <div className={styles.component}>{modeComponentMap[brushMode]}</div>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeOptions)
