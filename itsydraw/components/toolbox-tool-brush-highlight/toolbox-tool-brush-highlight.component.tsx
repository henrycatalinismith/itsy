import {
  BrushModes,
  selectActiveBrushMode,
  selectBrushes,
  handleBrushModeTap,
} from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-highlight.module.scss"

interface ToolboxToolBrushHighlightProps {
  rank: number
}

const mapStateToProps = (state) => ({
  rank: selectBrushes(state)[selectActiveBrushMode(state)].rank,
})

const mapDispatchToProps = {}

export function ToolboxToolBrushHighlight({
  rank,
}: ToolboxToolBrushHighlightProps): React.ReactElement {
  const className = cx(styles.component)

  const gridArea = [1, 1, 1, 1].join(" / ")
  const transform = `translateY(${rank * 100}%)`
  const style = { gridArea, transform }

  const div: React.HTMLAttributes<HTMLDivElement> = {
    className,
    style,
    "aria-hidden": true,
  }

  return <div {...div} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushHighlight)
