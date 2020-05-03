import { hex } from "wcag-contrast"
import { selectBrushColor } from "@highvalley.systems/itsydraw/store/tools"
import { PaletteColor } from "@highvalley.systems/typedefs/itsy"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-palette-hex.module.scss"

interface ToolboxToolPaletteHexProps {
  brushColor: PaletteColor
}

const mapStateToProps = (state) => ({
  brushColor: selectBrushColor(state),
})

const mapDispatchToProps = {}

export function ToolboxToolPaletteHex({
  brushColor,
}: ToolboxToolPaletteHexProps): React.ReactElement {
  const white = "#ffffff"
  const black = "#000000"

  const fg = brushColor.hex
  const bg = hex(white, fg) > hex(black, fg) ? white : black

  return (
    <div className={styles.component}>
      <div className={styles.label}>
        <Pixlflip fontSize={24}>{`hex:`}</Pixlflip>
      </div>
      <div className={styles.value}>
        <Pixlflip
          fontSize={32}
          bg={bg}
          fg={fg}
        >{`${brushColor.hex.toUpperCase()}`}</Pixlflip>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolPaletteHex)
