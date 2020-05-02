import ToolboxPicker from "@highvalley.systems/itsydraw/components/toolbox-picker"
import ToolboxTool from "@highvalley.systems/itsydraw/components/toolbox-tool"
import {
  selectToolbox,
  ToolboxLayouts,
  ToolboxState,
  ToolboxToolIds,
  updateToolboxLayout,
} from "@highvalley.systems/itsydraw/store/toolbox"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import useResizeObserver from "use-resize-observer/polyfilled"
import styles from "./toolbox.module.scss"

interface ToolboxProps {
  toolbox: ToolboxState
  updateToolboxLayout: (rect: Rect) => void
}

const mapStateToProps = (state) => ({
  toolbox: selectToolbox(state),
})

const mapDispatchToProps = {
  updateToolboxLayout,
}

export function Toolbox({
  toolbox,
  updateToolboxLayout,
}: ToolboxProps): React.ReactElement {
  const divRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useResizeObserver({ ref: divRef })

  const onResize = React.useCallback(() => {
    updateToolboxLayout({ ...toolbox.rect, width, height })
  }, [width, height])

  React.useEffect(() => onResize(), [width, height])

  const className = cx(styles.component, {
    [styles.crowded]: toolbox.layout === ToolboxLayouts.Crowded,
    [styles.stacked]: toolbox.layout === ToolboxLayouts.Stacked,
  })

  const divProps: React.HTMLAttributes<HTMLDivElement> = {
    className,
  }

  const toolsDiv: React.HTMLAttributes<HTMLDivElement> = {
    className: styles.tools,
    style: {
      height,
      gridTemplateRows: `repeat(${toolbox.tools.length}, ${height}px)`,
    },
  }

  return (
    <div {...divProps} ref={divRef}>
      <ToolboxPicker />
      <div {...toolsDiv}>
        <ToolboxTool tool={ToolboxToolIds.Brush} />
        <ToolboxTool tool={ToolboxToolIds.Camera} />
        <ToolboxTool tool={ToolboxToolIds.Select} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
