import {
  selectActiveTool,
  Tool,
} from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-highlight.module.scss"

interface ToolboxPickerHighlightProps {
  activeTool: Tool
}

const mapStateToProps = (state) => ({
  activeTool: selectActiveTool(state),
})

const mapDispatchToProps = {}

export function ToolboxPickerHighlight({
  activeTool,
}: ToolboxPickerHighlightProps): React.ReactElement {
  const className = cx(styles.component)

  const gridArea = [1, 1, 1, 1].join(" / ")
  const transform = `translateX(${activeTool.rank * 100}%)`
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
)(ToolboxPickerHighlight)
