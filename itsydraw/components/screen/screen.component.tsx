import ScreenBrush from "@highvalley.systems/itsydraw/components/screen-brush"
import ScreenPalette from "@highvalley.systems/itsydraw/components/screen-palette"
import {
  Tool,
  ToolIds,
  ToolStatuses,
  selectRankedTools,
} from "@highvalley.systems/itsydraw/store/tools"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import useResizeObserver from "use-resize-observer/polyfilled"
import ScreenContext from "./screen.context"
import styles from "./screen.module.scss"

interface ScreenProps {
  tools: Tool[]
}

const mapStateToProps = (state) => ({
  tools: selectRankedTools(state),
})

const mapDispatchToProps = {}

const screenMap: { [key in ToolIds]: React.ReactElement } = {
  [ToolIds.Brush]: <ScreenBrush />,
  [ToolIds.Camera]: <></>,
  [ToolIds.Palette]: <ScreenPalette />,
  [ToolIds.Select]: <></>,
}

export function Screen({ tools }: ScreenProps): React.ReactElement {
  const divRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useResizeObserver({ ref: divRef })
  const rect: Rect = {
    x: 0,
    y: 0,
    width: width,
    height: height,
  }

  return (
    <div className={styles.component} ref={divRef}>
      <ScreenContext.Provider value={{ rect }}>
        {tools.map((tool) => {
          const toolDiv: React.HTMLAttributes<HTMLDivElement> = {
            className: cx(styles.tool, {
              [styles.active]: tool.status === ToolStatuses.Active,
            }),
          }

          return (
            <div key={tool.id} {...toolDiv}>
              {screenMap[tool.id]}
            </div>
          )
        })}
      </ScreenContext.Provider>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
