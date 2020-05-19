import React from "react"
import styles from "./brush-icon-circle.module.scss"

interface BrushIconCircleProps {}

const points = [
  [64, 24],
  [24, 64],
  [64, 104],
  [104, 64],
]

export default function BrushIconCircle({}: BrushIconCircleProps): React.ReactElement {
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
      <circle className={styles.circle} cx={64} cy={64} r={40} />
      {points.map((p, i) => (
        <circle key={i} className={styles.point} cx={p[0]} cy={p[1]} r={10} />
      ))}
    </svg>
  )
}
