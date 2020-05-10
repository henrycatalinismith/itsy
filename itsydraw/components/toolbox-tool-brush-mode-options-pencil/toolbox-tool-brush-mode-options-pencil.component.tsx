import ToolboxToolBrushSize from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-size"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-options-pencil.module.scss"

interface ToolboxToolBrushModeOptionsPencilProps {
  // brushMode: BrushModes
  // changeBrushMode: (s: BrushModes) => void
}

const mapStateToProps = (state) => ({
  // brushMode: selectBrushMode(state),
})

const mapDispatchToProps = {
  // changeBrushMode,
}

export function ToolboxToolBrushModeOptionsPencil({}: ToolboxToolBrushModeOptionsPencilProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <ToolboxToolBrushSize />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeOptionsPencil)
