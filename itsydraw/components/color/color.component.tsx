import {
  activateColor,
  selectColor,
} from "@highvalley.systems/itsydraw/store/color"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { PaletteColor, PaletteIndex } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import React from "react"
import { Rect } from "react-konva"
import { connect } from "react-redux"
import styles from "./color.module.scss"

interface ColorProps {
  id: PaletteIndex
  active: boolean
  color: PaletteColor
  activateColor: (i: PaletteIndex) => void
  x: number
  y: number
  size: number
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
  x,
  y,
  size,
}: ColorProps): React.ReactElement {
  const onClick = React.useCallback(() => {
    activateColor(id)
  }, [])

  const props = {
    x,
    y,
    width: size,
    height: size,
    fill: color.hex,
    onTap: onClick,
    onTouchMove: onClick,
  }

  const rect = <Rect {...props} />

  if (active) {
    return (
      <>
        {rect}
        <Rect
          x={x + 0}
          y={y + 0}
          width={size - 1}
          height={size - 1}
          stroke="white"
          strokeWidth={2}
        />
        <Rect
          x={x + 2}
          y={y + 2}
          width={size - 5}
          height={size - 5}
          stroke="black"
          strokeWidth={2}
        />
      </>
    )
  }

  return rect
}

export default connect(mapStateToProps, mapDispatchToProps)(Color)
