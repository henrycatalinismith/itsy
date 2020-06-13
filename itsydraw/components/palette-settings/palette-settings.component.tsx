import { selectBrushColor } from "@highvalley.systems/itsydraw/store/tools"
import { PaletteColor } from "@highvalley.systems/typedefs/itsy"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import { hex } from "wcag-contrast"
import React from "react"
import { connect } from "react-redux"
import styles from "./palette-settings.module.scss"

interface PaletteSettingsProps {
  brushColor: PaletteColor
}

const mapStateToProps = (state) => ({
  brushColor: selectBrushColor(state),
})

const mapDispatchToProps = {}

export function PaletteSettings({
  brushColor,
}: PaletteSettingsProps): React.ReactElement {
  const style = {
    backgroundColor: brushColor.hex,
  }

  const className = styles.component

  const div: React.HTMLAttributes<HTMLDivElement> = {
    className,
    style,
  }

  const white = "#ffffff"
  const black = "#000000"
  const whiteContrast = hex(white, brushColor.hex)
  const blackContrast = hex(black, brushColor.hex)
  const useWhite = whiteContrast > blackContrast
  const fg = useWhite ? black : white
  const bg = useWhite ? white : black

  const indexFont = { fontSize: 32, fg, bg }
  const hexFont = { fontSize: 16, fg, bg }

  return (
    <div {...div}>
      <Pixlflip {...indexFont}>{`${brushColor.id}`}</Pixlflip>
      <Pixlflip {...hexFont}>{`${brushColor.hex.toUpperCase()}`}</Pixlflip>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PaletteSettings)
