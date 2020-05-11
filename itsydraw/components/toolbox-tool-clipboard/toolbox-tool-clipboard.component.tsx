import ToolboxToolClipboardRect from "@highvalley.systems/itsydraw/components/toolbox-tool-clipboard-rect"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-clipboard.module.scss"

interface ToolboxToolClipboardProps {
  // palette: Palette
}

const mapStateToProps = (state) => ({
  // palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxToolClipboard({}: ToolboxToolClipboardProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <ToolboxToolClipboardRect />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolClipboard)
