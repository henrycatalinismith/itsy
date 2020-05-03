import ToolboxToolCameraZoom from "@highvalley.systems/itsydraw/components/toolbox-tool-camera-zoom"
import React from "react"
import { connect } from "react-redux"

interface ToolboxToolSelectProps {
  // palette: Palette
}

const mapStateToProps = (state) => ({
  // palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxToolSelect({}: ToolboxToolSelectProps): React.ReactElement {
  return (
    <>
      <ToolboxToolCameraZoom />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxToolSelect)
