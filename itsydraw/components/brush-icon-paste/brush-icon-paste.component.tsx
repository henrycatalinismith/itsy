import React from "react"
import styles from "./brush-icon-paste.module.scss"

interface BrushIconPasteProps {}

export default function BrushIconPaste({}: BrushIconPasteProps): React.ReactElement {
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

  const handle: React.SVGAttributes<SVGEllipseElement> = {
    className: styles.handle,
    cx: 64,
    cy: 32,
    rx: 16,
    ry: 24,
  }

  const shaft: React.SVGAttributes<SVGRectElement> = {
    className: styles.shaft,
    x: 60,
    y: 32,
    width: 8,
    height: 32,
  }

  const stamp: React.SVGAttributes<SVGRectElement> = {
    className: styles.stamp,
    x: 32,
    y: 64,
    width: 64,
    height: 16,
  }

  return (
    <svg {...svg}>
      <ellipse {...handle} />
      <rect {...shaft} />
      <rect {...stamp} />
    </svg>
  )
}
