import {
  selectZoom,
  zoomCamera,
} from "@highvalley.systems/itsydraw/store/camera"
import React from "react"
import Slider from "react-rangeslider"
import { connect } from "react-redux"
import styles from "./toolbox-tool-camera-zoom.module.scss"

interface ToolboxToolCameraZoomProps {
  zoom: number
  zoomCamera: (z: number) => void
}

const mapStateToProps = (state) => ({
  zoom: selectZoom(state),
})

const mapDispatchToProps = {
  zoomCamera,
}

export function ToolboxToolCameraZoom({
  zoom,
  zoomCamera,
}: ToolboxToolCameraZoomProps): React.ReactElement {
  const onChange = React.useCallback((newValue) => {
    const value = parseInt(newValue, 10)
    const newZoom = value + 1
    zoomCamera(newZoom)
  }, [])

  return (
    <div className={styles.zoom}>
      <Slider min={1} max={8} value={zoom} onChange={onChange} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolCameraZoom)
