import ToolboxToolCamera from "@highvalley.systems/itsydraw/components/toolbox-tool-camera"
import ToolboxToolPencil from "@highvalley.systems/itsydraw/components/toolbox-tool-pencil"
import ToolboxToolSelect from "@highvalley.systems/itsydraw/components/toolbox-tool-select"
import {
  selectToolbox,
  ToolboxState,
  ToolboxToolIds,
} from "@highvalley.systems/itsydraw/store/toolbox"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React, { CSSProperties } from "react"
import { connect } from "react-redux"
import useResizeObserver from "use-resize-observer/polyfilled"
import ToolboxToolContext from "./toolbox-tool.context"
import styles from "./toolbox-tool.module.scss"

interface ToolboxToolProps {
  tool: ToolboxToolIds
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

  const thisIndex = _.indexOf(toolbox.tools, tool)
  const thatIndex = _.indexOf(toolbox.tools, toolbox.tool)

  console.log(thisIndex, thatIndex)
  const offset = 0 - thatIndex

  const translateY = offset * toolbox.rect.height
  const transform = `translateY(${translateY}px)`

  const gridRow = thisIndex + 1

  const style: CSSProperties = {
    height: toolbox.rect.height,
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
        {tool === ToolboxToolIds.Camera && <ToolboxToolCamera />}
        {tool === ToolboxToolIds.Brush && <ToolboxToolPencil />}
        {tool === ToolboxToolIds.Select && <ToolboxToolSelect />}
      </ToolboxToolContext.Provider>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxTool)
