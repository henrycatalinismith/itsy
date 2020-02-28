import Color from "@highvalley.systems/itsydraw/components/color"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { Palette as PaletteState } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./palette.module.scss"

interface PaletteProps {
  palette: PaletteState
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function Palette({ palette }: PaletteProps): React.ReactElement {
  return (
    <ol className={styles.palette}>
      {Object.entries(palette).map(([id, color]) => (
        <li key={id} className={styles.color}>
          <Color key={id} id={id} />
        </li>
      ))}
    </ol>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette)
