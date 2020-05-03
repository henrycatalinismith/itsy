import ToolboxToolPaletteHex from "@highvalley.systems/itsydraw/components/toolbox-tool-palette-hex"
import ToolboxToolPaletteIndex from "@highvalley.systems/itsydraw/components/toolbox-tool-palette-index"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-palette.module.scss"

interface ToolboxToolPaletteProps {
  // palette: Palette
}

const mapStateToProps = (state) => ({
  // palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxToolPalette({}: ToolboxToolPaletteProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <ToolboxToolPaletteIndex />
      <ToolboxToolPaletteHex />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxToolPalette)
