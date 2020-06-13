import ClipboardIcon from "@highvalley.systems/itsydraw/components/clipboard-icon"
import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import { ToolIds } from "@highvalley.systems/itsydraw/store/tools"
import React from "react"
import { connect } from "react-redux"

interface ToolboxPickerButtonClipboardProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function ToolboxPickerButtonClipboard({}: ToolboxPickerButtonClipboardProps): React.ReactElement {
  return (
    <ToolboxPickerButton id={ToolIds.Clipboard}>
      <ClipboardIcon />
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonClipboard)
