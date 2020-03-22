import Navigator from "@highvalley.systems/itsydraw/components/navigator"
import Palette from "@highvalley.systems/itsydraw/components/palette"
import Zoom from "@highvalley.systems/itsydraw/components/zoom"
import {
  selectToolbox,
  ToolboxLayouts,
  ToolboxState,
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

  const className = cx(styles.toolbox, {
    [styles.crowded]: toolbox.layout === ToolboxLayouts.Crowded,
    [styles.stacked]: toolbox.layout === ToolboxLayouts.Stacked,
  })

  const divProps: React.HTMLAttributes<HTMLDivElement> = {
    className,
  }

  return (
    <div {...divProps} ref={divRef}>
      <div className={styles.palette}>
        <Palette />
      </div>
      <div className={styles.navigator}>
        <Navigator />
      </div>
      <div className={styles.zoom}>
        <Zoom />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
