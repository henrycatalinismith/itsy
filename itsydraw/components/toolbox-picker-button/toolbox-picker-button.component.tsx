import {
  selectToolbox,
  ToolboxState,
  ToolboxToolIds,
  updateToolboxTool,
} from "@highvalley.systems/itsydraw/store/toolbox"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button.module.scss"

interface ToolboxPickerButtonProps {
  children: any
  id: ToolboxToolIds
  updateToolboxTool: (id: ToolboxToolIds) => void
}

const mapStateToProps = (state) => ({
  toolbox: selectToolbox(state),
})

const mapDispatchToProps = {
  updateToolboxTool,
}

export function ToolboxPickerButton({
  children,
  id,
  updateToolboxTool,
}: ToolboxPickerButtonProps): React.ReactElement {
  const onClick = React.useCallback(() => {
    updateToolboxTool(id)
  }, [])

  const button: React.HTMLAttributes<HTMLButtonElement> = {
    className: styles.component,
    onClick,
  }

  return <button {...button}>{children}</button>
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxPickerButton)
