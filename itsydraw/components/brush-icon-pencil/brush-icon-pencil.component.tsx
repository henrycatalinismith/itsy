import { BrushSizes } from "@highvalley.systems/itsydraw/store/tools"
import React from "react"
import styles from "./brush-icon-pencil.module.scss"

interface BrushIconPencilProps {
  color?: string
  size?: BrushSizes
}

const brushSizeStrokeWidths: { [key in BrushSizes]: number } = {
  1: 4,
  2: 8,
  4: 12,
  8: 16,
}

export default function BrushIconPencil({
  color = "#000000",
  size = 1,
}: BrushIconPencilProps): React.ReactElement {
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

  const pencil: React.SVGAttributes<SVGPathElement> = {
    className: styles.pencil,
    d:
      "M13 64l-2 2L1 90a7 7 0 009 9l24-10 2-1 48-48 1-1 1-1 12-12c3-3 3-8 0-11L85 2a7 7 0 00-10 0L13 64zm17 9l-3-3 43-43 3 3-43 43z",
  }

  const strokeWidth = brushSizeStrokeWidths[size]

  // d: "M-10,90 10,95",
  const line: React.SVGAttributes<SVGPathElement> = {
    className: styles.line,
    d: "M28,72 72,28",
    stroke: color,
    strokeWidth,
  }

  const lineBg = {
    ...line,
    stroke: "#000000",
    strokeWidth: (line.strokeWidth as number) + 4,
  }

  return (
    <svg {...svg}>
      <path {...pencil} />
      <path {...lineBg} />
      <path {...line} />
    </svg>
  )
}
