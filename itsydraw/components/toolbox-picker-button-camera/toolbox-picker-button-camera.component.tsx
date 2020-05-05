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
  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.component,
    viewBox: "0 0 128 128",
  }

  const image: React.SVGAttributes<SVGImageElement> = {
    className: styles.image,
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    href: `data:image/png;base64,${spritesheet}`,
    mask: "url(#camera)",
  }

  const frame: React.SVGAttributes<SVGRectElement> = {
    className: styles.frame,
    ...camera,
  }

  return (
    <ToolboxPickerButton id={ToolIds.Camera}>
      <svg {...svg}>
        <defs>
          <mask id="camera">
            <rect
              x={0}
              y={0}
              width={128}
              height={128}
              fill="#fff"
              opacity={0.9}
            />
            <rect
              x={camera.x}
              y={camera.y}
              width={camera.width}
              height={camera.height}
              fill="#fff"
              opacity={1}
            />
          </mask>
        </defs>
        <image {...image} />
        <rect {...frame} />
      </svg>
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonCamera)
