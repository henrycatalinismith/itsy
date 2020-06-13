import PaletteIcon from "@highvalley.systems/itsydraw/components/palette-icon"
import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import { ToolIds } from "@highvalley.systems/itsydraw/store/tools"
import React from "react"
import { connect } from "react-redux"

interface ToolboxPickerButtonPaletteProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function ToolboxPickerButtonPalette({}: ToolboxPickerButtonPaletteProps): React.ReactElement {
  return (
    <ToolboxPickerButton id={ToolIds.Palette}>
      <PaletteIcon />
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonPalette)
