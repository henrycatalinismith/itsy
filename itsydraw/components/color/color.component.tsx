import cx from "classnames"
import React from "react"
import { connect } from "react-redux"

import {
  selectColor,
  activateColor,
} from "@highvalley.systems/itsydraw/store/color"

import {
  PaletteIndex,
  PaletteColor,
  selectPalette,
} from "@highvalley.systems/itsydraw/store/palette"

import styles from "./color.module.scss"

interface ColorProps {
  id: PaletteIndex
  active: boolean
  color: PaletteColor
  activateColor: (i: PaletteIndex) => void
}

const mapStateToProps = (state, ownProps) => ({
  active: selectColor(state) === ownProps.id,
  color: selectPalette(state)[ownProps.id],
})

const mapDispatchToProps = {
  activateColor,
}

export function Color({
  active,
  activateColor,
  id,
  color,
}: ColorProps): React.ReactElement {
  const onClick = React.useCallback(() => {
    activateColor(id)
  }, [])

  const button = {
    className: cx(styles.color, {
      [styles.active]: active,
    }),
    onClick,
  }

  return (
    <button {...button}>
      <span className={styles.square} style={{ backgroundColor: color.hex }} />
    </button>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Color)
