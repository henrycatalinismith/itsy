import React from "react"
import { connect } from "react-redux"
import {
  SpritesheetState,
  selectSpritesheet,
} from "@itsy.studio/graphics/store/spritesheet"
import styles from "./spritesheet.module.scss"

interface SpritesheetProps {
  palette: PaletteState
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function Spritesheet({}: SpritesheetProps): React.ReactElement {
  return <></>
  /*
  return (
    <ol className={styles.palette}>
      {Object.entries(palette).map(([id, color]) => (
        <li key={id} className={styles.color}>
          <Color key={id} id={id} />
        </li>
      ))}
    </ol>
  )
  */
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
