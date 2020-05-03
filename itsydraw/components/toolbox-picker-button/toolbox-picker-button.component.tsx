import {
  selectTools,
  ToolIds,
  changeActiveTool,
} from "@highvalley.systems/itsydraw/store/tools"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button.module.scss"

interface ToolboxPickerButtonProps {
  children: any
  id: ToolIds
  changeActiveTool: (id: ToolIds) => void
}

const mapStateToProps = (state) => ({
  toolbox: selectTools(state),
})

const mapDispatchToProps = {
  changeActiveTool,
}

export function ToolboxPickerButton({
  children,
  id,
  changeActiveTool,
}: ToolboxPickerButtonProps): React.ReactElement {
  const onClick = React.useCallback(() => {
    changeActiveTool(id)
  }, [])

  const button: React.HTMLAttributes<HTMLButtonElement> = {
    className: styles.component,
    onClick,
  }

  return <button {...button}>{children}</button>
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxPickerButton)
