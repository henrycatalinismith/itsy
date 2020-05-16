import React from "react"
import styles from "./toolbox-tool-brush-mode-icon-line.module.scss"

interface ToolboxToolBrushModeIconLineProps {}

export function ToolboxToolBrushModeIconLine({}: ToolboxToolBrushModeIconLineProps): React.ReactElement {
  const className = styles.component
  const viewBox = "0 0 128 128"
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
      <path className={styles.line} d="M32,96 L96,32" />
      <circle className={styles.point} cx={32} cy={96} r={16} />
      <circle className={styles.point} cx={96} cy={32} r={16} />
    </svg>
  )
}

export default ToolboxToolBrushModeIconLine
