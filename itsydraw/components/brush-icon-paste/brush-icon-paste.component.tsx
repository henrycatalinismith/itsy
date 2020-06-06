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

  return (
    <svg {...svg}>
      <circle cx={32} cy={32} r={64} fill="red" />
    </svg>
  )
}
