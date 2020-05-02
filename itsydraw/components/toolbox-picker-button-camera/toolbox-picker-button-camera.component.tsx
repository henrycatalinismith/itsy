import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import { ToolboxToolIds } from "@highvalley.systems/itsydraw/store/toolbox"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button-camera.module.scss"

interface ToolboxPickerButtonCameraProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function ToolboxPickerButtonCamera({}: ToolboxPickerButtonCameraProps): React.ReactElement {
  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.component,
    viewBox: "0 0 32 32",
  }

  const canvas: React.SVGAttributes<SVGPathElement> = {
    className: styles.canvas,
    d: "M4,4 L28,4 L28,28 L4,28 L4,4",
  }

  const camera: React.SVGAttributes<SVGPathElement> = {
    className: styles.camera,
    d: "M8,8 L16,8 L16,16 L8,16 L8,8",
  }

  return (
    <ToolboxPickerButton id={ToolboxToolIds.Camera}>
      <svg {...svg}>
        <path {...canvas} />
        <path {...camera} />
      </svg>
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonCamera)
