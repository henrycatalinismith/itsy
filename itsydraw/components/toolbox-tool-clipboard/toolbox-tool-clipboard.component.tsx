import ToolboxToolCameraZoom from "@highvalley.systems/itsydraw/components/toolbox-tool-camera-zoom"
import React from "react"
import { connect } from "react-redux"

interface ToolboxToolClipboardProps {
  // palette: Palette
}

const mapStateToProps = (state) => ({
  // palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxToolClipboard({}: ToolboxToolClipboardProps): React.ReactElement {
  return <></>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolClipboard)
