import {
  selectBrushColor,
  selectPalette,
} from "@highvalley.systems/itsydraw/store/tools"
import { Palette, PaletteColor } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./palette-icon.module.scss"

interface PaletteIconProps {
  brushColor: PaletteColor
  palette: Palette
}

const mapStateToProps = (state) => ({
  brushColor: selectBrushColor(state),
  palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function PaletteIcon({
  brushColor,
  palette,
}: PaletteIconProps): React.ReactElement {
  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.component,
    viewBox: "-8 -8 144 144",
    preserveAspectRatio: "xMidYMid meet",
    width: "100%",
    height: "100%",
  }

  const highlight: React.SVGAttributes<SVGRectElement> = {
    x: (brushColor.id % 4) * 32 + 8,
    y: Math.floor(brushColor.id / 4) * 32 + 8,
    width: 24,
    height: 24,
    mask: "url(#brushColor)",
  }

  return (
    <svg {...svg}>
      {Object.values(palette).map((color) => {
        const x = (color.id % 4) * 32
        const y = Math.floor(color.id / 4) * 32
        const width = 32
        const height = 32
        const fill = color.hex

        const rect: React.SVGAttributes<SVGRectElement> = {
          x,
          y,
          width,
          height,
          fill,
        }

        return <rect key={color.id} {...rect} />
      })}
      <rect className={styles.activeHighlight1} {...highlight} />
      <rect className={styles.activeHighlight2} {...highlight} />
    </svg>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PaletteIcon)
