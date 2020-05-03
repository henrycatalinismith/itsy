import ToolboxToolBrushSize from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-size"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush.module.scss"

interface ToolboxToolBrushProps {
  // palette: Palette
}

const mapStateToProps = (state) => ({
  // palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxToolBrush({}: ToolboxToolBrushProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <ToolboxToolBrushSize />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxToolBrush)
