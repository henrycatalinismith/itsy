import ToolboxToolBrushMode, {
  ToolboxToolBrushModeProps,
} from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode"
import { BrushModes } from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-circle.module.scss"

interface ToolboxToolBrushModeCircleProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

const points = [
  [64, 24],
  [24, 64],
  [64, 104],
  [104, 64],
]

function CircleIcon(): React.ReactElement {
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

export function ToolboxToolBrushModeCircle({}: ToolboxToolBrushModeCircleProps): React.ReactElement {
  const mode = BrushModes.Circle
  const icon = <CircleIcon />

  const props: ToolboxToolBrushModeProps = {
    mode,
    icon,
  }

  return <ToolboxToolBrushMode {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeCircle)
