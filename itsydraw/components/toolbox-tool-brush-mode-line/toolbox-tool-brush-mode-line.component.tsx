import ToolboxToolBrushMode, {
  ToolboxToolBrushModeProps,
} from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode"
import { BrushModes } from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-line.module.scss"

interface ToolboxToolBrushModeLineProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

function LineIcon(): React.ReactElement {
  const className = styles.icon
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

export function ToolboxToolBrushModeLine({}: ToolboxToolBrushModeLineProps): React.ReactElement {
  const mode = BrushModes.Line
  const icon = <LineIcon />

  const props: ToolboxToolBrushModeProps = {
    mode,
    icon,
  }

  return <ToolboxToolBrushMode {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeLine)
