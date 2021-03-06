import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import styles from "./camera-icon.module.scss"

interface CameraIconProps {
  camera: Rect
  spritesheet: string
}

export function CameraIcon({
  camera,
  spritesheet,
}: CameraIconProps): React.ReactElement {
  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.component,
    viewBox: "-8 -8 144 144",
    preserveAspectRatio: "xMidYMid meet",
    width: "100%",
    height: "100%",
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
  )
}

export default CameraIcon
