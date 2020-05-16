import ToolboxToolBrushModeIconCircle from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-icon-circle"
import ToolboxToolBrushModeIconLine from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-icon-line"
import ToolboxToolBrushModeIconPencil from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-icon-pencil"
import {
  BrushModes,
  changeBrushMode,
  selectActiveBrushMode,
} from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-button.module.scss"

interface ToolboxToolBrushModeButtonProps {
  activeMode: BrushModes
  changeBrushMode: (m: BrushModes) => void
  mode: BrushModes
}

const mapStateToProps = (state) => ({
  activeMode: selectActiveBrushMode(state),
})

const mapDispatchToProps = {
  changeBrushMode,
}

const modeComponentMap: { [key in BrushModes]: React.ReactElement } = {
  [BrushModes.Pencil]: <ToolboxToolBrushModeIconPencil />,
  [BrushModes.Line]: <ToolboxToolBrushModeIconLine />,
  [BrushModes.Circle]: <ToolboxToolBrushModeIconCircle />,
}

export function ToolboxToolBrushModeButton({
  activeMode,
  changeBrushMode,
  mode,
}: ToolboxToolBrushModeButtonProps): React.ReactElement {
  const className = cx(styles.component, {
    [styles.active]: mode === activeMode,
  })

  const onClick = React.useCallback(() => {
    changeBrushMode(mode)
  }, [])

  const button: React.HTMLAttributes<HTMLButtonElement> = {
    className,
    onClick,
  }

  return <button {...button}>{modeComponentMap[mode]}</button>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeButton)
