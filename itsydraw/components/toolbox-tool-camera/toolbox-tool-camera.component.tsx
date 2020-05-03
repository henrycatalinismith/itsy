import ToolboxToolCameraZoom from "@highvalley.systems/itsydraw/components/toolbox-tool-camera-zoom"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-camera.module.scss"

interface ToolboxToolCameraProps {
  // palette: Palette
}

const mapStateToProps = (state) => ({
  // palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxToolCamera({}: ToolboxToolCameraProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <ToolboxToolCameraZoom />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxToolCamera)
