import ToolboxToolCamera from "@highvalley.systems/itsydraw/components/toolbox-tool-camera"
import ToolboxToolPencil from "@highvalley.systems/itsydraw/components/toolbox-tool-pencil"
import ToolboxToolSelect from "@highvalley.systems/itsydraw/components/toolbox-tool-select"
import {
  selectActiveTool,
  selectRankedTools,
  Tool,
  ToolIds,
} from "@highvalley.systems/itsydraw/store/tools"
import { selectToolboxHeight } from "@highvalley.systems/itsydraw/store/toolbox"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React, { CSSProperties } from "react"
import { connect } from "react-redux"
import useResizeObserver from "use-resize-observer/polyfilled"
import ToolboxToolContext from "./toolbox-tool.context"
import styles from "./toolbox-tool.module.scss"

interface ToolboxToolProps {
  id: ToolIds
  activeTool: Tool
  tools: Tool[]
  toolboxHeight: number
}

const mapStateToProps = (state) => ({
  activeTool: selectActiveTool(state),
  tools: selectRankedTools(state),
  toolboxHeight: selectToolboxHeight(state),
})

const mapDispatchToProps = {}

export function ToolboxTool({
  id,
  activeTool,
  tools,
  toolboxHeight,
}: ToolboxToolProps): React.ReactElement {
  const divRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useResizeObserver({ ref: divRef })

  const rect: Rect = {
    x: 0,
    y: 0,
    width,
    height,
  }

  const thisIndex = _.indexOf(tools, id)
  const thatIndex = _.indexOf(tools, activeTool)

  console.log(thisIndex, thatIndex)
  const offset = 0 - thatIndex

  const translateY = offset * toolboxHeight
  const transform = `translateY(${translateY}px)`

  const gridRow = thisIndex + 1

  const style: CSSProperties = {
    height: toolboxHeight,
    gridArea: `${gridRow} / 1 / ${gridRow} /2`,
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
        {id === ToolIds.Camera && <ToolboxToolCamera />}
        {id === ToolIds.Brush && <ToolboxToolPencil />}
        {id === ToolIds.Select && <ToolboxToolSelect />}
      </ToolboxToolContext.Provider>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxTool)
