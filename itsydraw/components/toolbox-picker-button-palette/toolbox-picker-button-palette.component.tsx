import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import {
  ToolIds,
  selectBrushColor,
  selectPalette,
} from "@highvalley.systems/itsydraw/store/tools"
import { Palette, PaletteColor } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button-palette.module.scss"

interface ToolboxPickerButtonPaletteProps {
  brushColor: PaletteColor
  palette: Palette
}

const mapStateToProps = (state) => ({
  brushColor: selectBrushColor(state),
  palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxPickerButtonPalette({
  brushColor,
  palette,
}: ToolboxPickerButtonPaletteProps): React.ReactElement {
  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.component,
    viewBox: "0 0 4 4",
  }

  const highlight: React.SVGAttributes<SVGRectElement> = {
    x: brushColor.id % 4,
    y: Math.floor(brushColor.id / 4),
    width: 1,
    height: 1,
  }

  return (
    <ToolboxPickerButton id={ToolIds.Palette}>
      <svg {...svg}>
        {Object.values(palette).map((color) => {
          const x = color.id % 4
          const y = Math.floor(color.id / 4)
          const width = 1
          const height = 1
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
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonPalette)
