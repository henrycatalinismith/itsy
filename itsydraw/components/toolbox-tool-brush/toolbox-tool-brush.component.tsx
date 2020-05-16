import ToolboxToolBrushModeOptions from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-options"
import ToolboxToolBrushModePicker from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-picker"
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
      <ToolboxToolBrushModePicker />
      <ToolboxToolBrushModeOptions />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxToolBrush)
