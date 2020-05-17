import ToolboxToolBrushMode, {
  ToolboxToolBrushModeProps,
} from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode"
import { BrushModes } from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-pencil.module.scss"

interface ToolboxToolBrushModePencilProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

function PencilIcon(): React.ReactElement {
  const className = styles.icon
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
      <path d="M13 64l-2 2L1 90a7 7 0 009 9l24-10 2-1 48-48 1-1 1-1 12-12c3-3 3-8 0-11L85 2a7 7 0 00-10 0L13 64zm17 9l-3-3 43-43 3 3-43 43z" />
    </svg>
  )
}

export function ToolboxToolBrushModePencil({}: ToolboxToolBrushModePencilProps): React.ReactElement {
  const mode = BrushModes.Pencil
  const icon = <PencilIcon />

  const props: ToolboxToolBrushModeProps = {
    mode,
    icon,
  }

  return <ToolboxToolBrushMode {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModePencil)
