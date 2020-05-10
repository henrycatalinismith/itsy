import ToolboxToolBrushSize from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-size"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-options-circle.module.scss"

interface ToolboxToolBrushModeOptionsCircleProps {
  // brushMode: BrushModes
  // changeBrushMode: (s: BrushModes) => void
}

const mapStateToProps = (state) => ({
  // brushMode: selectActiveBrushMode(state),
})

const mapDispatchToProps = {
  // changeBrushMode,
}

export function ToolboxToolBrushModeOptionsCircle({}: ToolboxToolBrushModeOptionsCircleProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <ToolboxToolBrushSize />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeOptionsCircle)
