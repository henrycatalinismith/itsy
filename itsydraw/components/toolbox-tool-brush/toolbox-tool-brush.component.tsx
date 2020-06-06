import ToolboxToolBrushHighlight from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-highlight"
import ToolboxToolBrushModeCircle from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-circle"
import ToolboxToolBrushModeFill from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-fill"
import ToolboxToolBrushModeLine from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-line"
import ToolboxToolBrushModePaste from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-paste"
import ToolboxToolBrushModePencil from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-pencil"
import {
  ToolboxLayouts,
  selectToolboxLayout,
} from "@highvalley.systems/itsydraw/store/toolbox"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush.module.scss"

interface ToolboxToolBrushProps {
  layout: ToolboxLayouts
}

const mapStateToProps = (state) => ({
  layout: selectToolboxLayout(state),
})

const mapDispatchToProps = {}

export function ToolboxToolBrush({
  layout,
}: ToolboxToolBrushProps): React.ReactElement {
  const className = cx(styles.component, styles[layout])
  return (
    <div className={className}>
      <ToolboxToolBrushHighlight />
      <ToolboxToolBrushModePencil />
      <ToolboxToolBrushModeLine />
      <ToolboxToolBrushModeCircle />
      <ToolboxToolBrushModeFill />
      <ToolboxToolBrushModePaste />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxToolBrush)
