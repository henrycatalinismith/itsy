import BrushSettings from "@highvalley.systems/itsydraw/components/brush-settings"
import CameraSettings from "@highvalley.systems/itsydraw/components/camera-settings"
import ClipboardSettings from "@highvalley.systems/itsydraw/components/clipboard-settings"
import PaletteSettings from "@highvalley.systems/itsydraw/components/palette-settings"
import { selectToolboxHeight } from "@highvalley.systems/itsydraw/store/toolbox"
import {
  selectActiveTool,
  Tool,
  ToolIds,
} from "@highvalley.systems/itsydraw/store/tools"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import useResizeObserver from "use-resize-observer/polyfilled"
import ToolboxToolContext from "./toolbox-tool.context"
import styles from "./toolbox-tool.module.scss"

interface ToolboxToolProps {
  id: ToolIds
  activeTool: Tool
  height: number
}

const mapStateToProps = (state) => ({
  activeTool: selectActiveTool(state),
  height: selectToolboxHeight(state),
})

const mapDispatchToProps = {}

export function ToolboxTool({
  id,
  activeTool,
  height,
}: ToolboxToolProps): React.ReactElement {
  const divRef = React.useRef<HTMLDivElement>(null)
  const toolRect = useResizeObserver({ ref: divRef })

  const rect: Rect = {
    x: 0,
    y: 0,
    width: toolRect.width,
    height: toolRect.height,
  }

  const className = cx(styles.component, {
    [styles.active]: id === activeTool.id,
  })

  const style = {
    maxHeight: height,
  }

  const divProps: React.HTMLAttributes<HTMLDivElement> = {
    className,
    style,
  }

  return (
    <div {...divProps} ref={divRef}>
      <ToolboxToolContext.Provider value={{ rect }}>
        {id === ToolIds.Brush && <BrushSettings />}
        {id === ToolIds.Camera && <CameraSettings />}
        {id === ToolIds.Clipboard && <ClipboardSettings />}
        {id === ToolIds.Palette && <PaletteSettings />}
      </ToolboxToolContext.Provider>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxTool)
