import Navigator from "@highvalley.systems/itsydraw/components/navigator"
import Palette from "@highvalley.systems/itsydraw/components/palette"
import Zoom from "@highvalley.systems/itsydraw/components/zoom"
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
import React from "react"
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

  return (
    <div {...divProps} ref={divRef}>
      <ol className={styles.menu}>
        {Object.keys(ToolboxTools).map((tool) => {
          const onClick = React.useCallback(() => {
            updateToolboxTool(tool as ToolboxTools)
          }, [])
          const li = {
            key: tool,
            className: cx(styles.menuitem, {
              [styles.menuitem__active]: toolbox.tool === tool,
            }),
            onClick,
          }
          return (
            <li {...li}>
              <Pixlflip fontSize={24}>{tool}</Pixlflip>
            </li>
          )
        })}
      </ol>
      <div className={styles.tools} style={{ height }}>
        <div
          className={styles.pencil}
          style={{
            height,
            transform: `translateY(${
              toolbox.tool === ToolboxTools.Pencil ? 0 : 0 - height
            }px)`,
          }}
        >
          <Palette />
        </div>
        <div
          className={styles.camera}
          style={{
            height,
            transform: `translateY(${
              toolbox.tool === ToolboxTools.Camera ? 0 - height : height
            }px)`,
          }}
        >
          <Navigator />
          <Zoom />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
