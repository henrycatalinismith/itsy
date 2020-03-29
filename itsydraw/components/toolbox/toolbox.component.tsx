import ToolboxTool from "@highvalley.systems/itsydraw/components/toolbox-tool"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import {
  selectToolbox,
  ToolboxLayouts,
  ToolboxState,
  ToolboxTools,
  updateToolboxLayout,
  updateToolboxTool,
} from "@highvalley.systems/itsydraw/store/toolbox"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import React, { CSSProperties } from "react"
import { connect } from "react-redux"
import useResizeObserver from "use-resize-observer/polyfilled"
import styles from "./toolbox.module.scss"

interface ToolboxProps {
  toolbox: ToolboxState
  updateToolboxLayout: (rect: Rect) => void
  updateToolboxTool: (tool: ToolboxTools) => void
}

const mapStateToProps = (state) => ({
  toolbox: selectToolbox(state),
})

const mapDispatchToProps = {
  updateToolboxLayout,
  updateToolboxTool,
}

export function Toolbox({
  toolbox,
  updateToolboxLayout,
  updateToolboxTool,
}: ToolboxProps): React.ReactElement {
  const divRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useResizeObserver({ ref: divRef })

  const onResize = React.useCallback(() => {
    updateToolboxLayout({ ...toolbox.rect, width, height })
  }, [width, height])

  React.useEffect(() => onResize(), [width, height])

  const className = cx(styles.toolbox, {
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

  console.log(`repeat(${toolbox.tools.length}, ${height}px)`)

  return (
    <div {...divProps} ref={divRef}>
      <ol className={styles.menu}>
        {Object.keys(ToolboxTools).map((tool) => {
          const onClick = React.useCallback(() => {
            updateToolboxTool(tool as ToolboxTools)
          }, [])
          const li = {
            className: cx(styles.menuitem, {
              [styles.menuitem__active]: toolbox.tool === tool,
            }),
            onClick,
          }
          return (
            <li {...li} key={tool}>
              <Pixlflip fontSize={24}>{tool}</Pixlflip>
            </li>
          )
        })}
      </ol>
      <div {...toolsDiv}>
        <ToolboxTool tool={ToolboxTools.Pencil} />
        <ToolboxTool tool={ToolboxTools.Camera} />
        <ToolboxTool tool={ToolboxTools.Select} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
