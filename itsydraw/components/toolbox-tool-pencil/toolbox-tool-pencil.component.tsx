import ToolboxToolPencilSize from "@highvalley.systems/itsydraw/components/toolbox-tool-pencil-size"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-pencil.module.scss"

interface ToolboxToolPencilProps {
  // palette: Palette
}

const mapStateToProps = (state) => ({
  // palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxToolPencil({}: ToolboxToolPencilProps): React.ReactElement {
  return (
    <div className={styles.pencil}>
      <ToolboxToolPencilSize />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxToolPencil)
