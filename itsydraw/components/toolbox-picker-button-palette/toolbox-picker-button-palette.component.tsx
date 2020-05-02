import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { ToolboxToolIds } from "@highvalley.systems/itsydraw/store/toolbox"
import { Palette } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button-palette.module.scss"

interface ToolboxPickerButtonPaletteProps {
  palette: Palette
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxPickerButtonPalette({
  palette,
}: ToolboxPickerButtonPaletteProps): React.ReactElement {
  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.component,
    viewBox: "0 0 4 4",
  }

  const scale = 0.05
  const translateX = 64
  const translateY = 64
  const transform = `scale(${scale}) translate(${translateX} ${translateY})`

  return (
    <ToolboxPickerButton id={ToolboxToolIds.Palette}>
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

          return <rect {...rect} />
        })}
      </svg>
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonPalette)
