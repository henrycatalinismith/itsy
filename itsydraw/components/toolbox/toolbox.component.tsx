import ToolboxPicker from "@highvalley.systems/itsydraw/components/toolbox-picker"
import ToolboxTool from "@highvalley.systems/itsydraw/components/toolbox-tool"
import {
  ToolboxLayouts,
  selectToolboxLayout,
  updateToolboxLayout,
} from "@highvalley.systems/itsydraw/store/toolbox"
import { ToolIds } from "@highvalley.systems/itsydraw/store/tools"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import useResizeObserver from "use-resize-observer/polyfilled"
import styles from "./toolbox.module.scss"

interface ToolboxProps {
  layout: ToolboxLayouts
  updateToolboxLayout: (rect: Rect) => void
}

const mapStateToProps = (state) => ({
  layout: selectToolboxLayout(state),
})

const mapDispatchToProps = {
  updateToolboxLayout,
}

export function Toolbox({
  layout,
  updateToolboxLayout,
}: ToolboxProps): React.ReactElement {
  const divRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useResizeObserver({ ref: divRef })

  const onResize = React.useCallback(() => {
    updateToolboxLayout({ x: 0, y: 0, width, height })
  }, [width, height])

  React.useEffect(() => onResize(), [width, height])

  const divProps: React.HTMLAttributes<HTMLDivElement> = {
    className: styles.component,
  }

  const toolsDiv: React.HTMLAttributes<HTMLDivElement> = {
    className: styles.tools,
  }

  return (
    <div {...divProps} ref={divRef}>
      <ToolboxPicker />
      <div {...toolsDiv}>
        <ToolboxTool id={ToolIds.Brush} />
        <ToolboxTool id={ToolIds.Camera} />
        <ToolboxTool id={ToolIds.Palette} />
        <ToolboxTool id={ToolIds.Clipboard} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
