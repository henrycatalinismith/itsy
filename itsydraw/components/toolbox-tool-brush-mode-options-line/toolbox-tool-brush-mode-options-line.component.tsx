import ToolboxToolBrushModeOptionsLineAngle from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-options-line-angle"
import ToolboxToolBrushSize from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-size"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-options-line.module.scss"

interface ToolboxToolBrushModeOptionsLineProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function ToolboxToolBrushModeOptionsLine({}: ToolboxToolBrushModeOptionsLineProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <ToolboxToolBrushSize />
      <ToolboxToolBrushModeOptionsLineAngle />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeOptionsLine)
