import { BrushSizes } from "@highvalley.systems/itsydraw/store/tools"
import React from "react"
import styles from "./brush-icon-fill.module.scss"

interface BrushIconFillProps {
  color?: string
  size?: BrushSizes
}

const brushSizeStrokeWidths: { [key in BrushSizes]: number } = {
  1: 4,
  2: 8,
  4: 12,
  8: 16,
}

export default function BrushIconFill({
  color = "#000000",
  size = 1,
}: BrushIconFillProps): React.ReactElement {
  const className = styles.component
  const viewBox = "-10 -10 120 120"
  const preserveAspectRatio = "xMidYMid meet"
  const width = "100%"
  const height = "100%"

  const svg: React.SVGAttributes<SVGElement> = {
    className,
    preserveAspectRatio,
    viewBox,
    width,
    height,
  }

  const bucket: React.SVGAttributes<SVGRectElement> = {
    className: styles.bucket,
    x: 16,
    y: 16,
    width: 64,
    height: 64,
  }

  const paint: React.SVGAttributes<SVGRectElement> = {
    className: styles.paint,
    x: 16,
    y: 16,
    width: 64,
    height: 64,
    fill: color,
    mask: "url(#paintMask)",
  }

  const paintMask: React.SVGAttributes<SVGPolygonElement> = {
    fill: "#fff",
    points: ["16,80", "80,80", "80,16"].join(" "),
    opacity: 1,
    transform: "rotate(45deg)",
  }

  const droplet: React.SVGAttributes<SVGEllipseElement> = {
    className: styles.droplet,
    cx: 112,
    cy: 80,
    rx: 8,
    ry: 11,
    fill: color,
  }

  return (
    <svg {...svg}>
      <defs>
        <mask id="paintMask">
          <polygon {...paintMask} />
        </mask>
      </defs>
      <rect {...bucket} />
      <rect {...paint} />
      <ellipse {...droplet} />
    </svg>
  )
}
