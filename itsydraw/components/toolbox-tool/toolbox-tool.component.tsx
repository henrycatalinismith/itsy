import useResizeObserver from "use-resize-observer/polyfilled"
import {
  selectToolbox,
  ToolboxState,
  ToolboxTools,
} from "@highvalley.systems/itsydraw/store/toolbox"
import ToolboxToolCamera from "@highvalley.systems/itsydraw/components/toolbox-tool-camera"
import ToolboxToolPencil from "@highvalley.systems/itsydraw/components/toolbox-tool-pencil"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import ToolboxToolContext from "./toolbox-tool.context"
import styles from "./toolbox-tool.module.scss"

interface ToolboxToolProps {
  tool: ToolboxTools
  toolbox: ToolboxState
}

const mapStateToProps = (state) => ({
  toolbox: selectToolbox(state),
})

const mapDispatchToProps = {
  // updateToolboxLayout,
  // updateToolboxTool,
}

export function ToolboxTool({
  tool,
  toolbox,
}: ToolboxToolProps): React.ReactElement {
  const divRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useResizeObserver({ ref: divRef })

  const rect: Rect = {
    x: 0,
    y: 0,
    width,
    height,
  }

  const offset =
    _.indexOf(toolbox.tools, tool) -
    _.indexOf(toolbox.tools, toolbox.tool) -
    _.indexOf(toolbox.tools, tool)
  const translateY = offset * toolbox.rect.height
  const transform = `translateY(${translateY}px)`

  const style = {
    height: toolbox.rect.height,
    transform,
  }

  const className = cx(styles.tool)

  const divProps: React.HTMLAttributes<HTMLDivElement> = {
    className,
    style,
  }

  return (
    <div {...divProps} ref={divRef}>
      <ToolboxToolContext.Provider value={{ rect }}>
        {tool === ToolboxTools.Camera && <ToolboxToolCamera />}
        {tool === ToolboxTools.Pencil && <ToolboxToolPencil />}
      </ToolboxToolContext.Provider>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxTool)
