import {
  selectActiveTool,
  Tool,
  ToolIds,
  changeActiveTool,
} from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button.module.scss"

interface ToolboxPickerButtonProps {
  children: any
  id: ToolIds
  activeTool: Tool
  changeActiveTool: (id: ToolIds) => void
}

const mapStateToProps = (state) => ({
  activeTool: selectActiveTool(state),
})

const mapDispatchToProps = {
  changeActiveTool,
}

export function ToolboxPickerButton({
  children,
  id,
  activeTool,
  changeActiveTool,
}: ToolboxPickerButtonProps): React.ReactElement {
  const onClick = React.useCallback(() => {
    changeActiveTool(id)
  }, [])

  const className = cx(styles.component, {
    [styles.active]: activeTool.id === id,
  })

  const button: React.HTMLAttributes<HTMLButtonElement> = {
    className,
    onClick,
  }

  return <button {...button}>{children}</button>
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxPickerButton)
