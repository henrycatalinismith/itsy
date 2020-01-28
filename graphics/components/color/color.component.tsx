import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import {
  PaletteIndex,
  PaletteColor,
  activateColor,
  selectPalette,
} from "@itsy.studio/graphics/store/palette"
import styles from "./color.module.scss"

interface ColorProps {
  id: PaletteIndex
  color: PaletteColor
  activateColor: (i: PaletteIndex) => void
}

const mapStateToProps = (state, ownProps) => ({
  color: selectPalette(state)[ownProps.id],
})

const mapDispatchToProps = {
  activateColor,
}

export function Color({
  activateColor,
  id,
  color,
}: ColorProps): React.ReactElement {
  const onClick = React.useCallback(() => {
    activateColor(id)
  }, [])

  const button = {
    className: cx(styles.color, {
      [styles.active]: color.active,
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
