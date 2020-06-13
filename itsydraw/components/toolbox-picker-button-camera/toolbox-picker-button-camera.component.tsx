import CameraIcon from "@highvalley.systems/itsydraw/components/camera-icon"
import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import { selectSpritesheetPng } from "@highvalley.systems/itsydraw/store/spritesheet"
import { selectCamera, ToolIds } from "@highvalley.systems/itsydraw/store/tools"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button-camera.module.scss"

interface ToolboxPickerButtonCameraProps {
  camera: Rect
  spritesheet: string
}

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  spritesheet: selectSpritesheetPng(state),
})

const mapDispatchToProps = {}

export function ToolboxPickerButtonCamera({
  camera,
  spritesheet,
}: ToolboxPickerButtonCameraProps): React.ReactElement {
  return (
    <ToolboxPickerButton id={ToolIds.Camera}>
      <CameraIcon spritesheet={spritesheet} camera={camera} />
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonCamera)
