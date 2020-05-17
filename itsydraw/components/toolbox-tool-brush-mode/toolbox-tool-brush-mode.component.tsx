import {
  BrushModes,
  selectActiveBrushMode,
  handleBrushModeTap,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode.module.scss"

export interface ToolboxToolBrushModeProps {
  mode: BrushModes
  active?: boolean
  icon?: React.ReactElement
  handleBrushModeTap?: (mode: BrushModes) => void
}

const mapStateToProps = (state, { mode }) => ({
  active: selectActiveBrushMode(state) === mode,
})

const mapDispatchToProps = {
  handleBrushModeTap,
}

export function ToolboxToolBrushMode({
  mode,
  active,
  icon = <>icon</>,
  handleBrushModeTap,
}: ToolboxToolBrushModeProps): React.ReactElement {
  const className = cx(styles.component, {
    [styles.active]: active,
  })

  const onClick = React.useCallback(() => handleBrushModeTap(mode), [])

  const button: React.HTMLAttributes<HTMLButtonElement> = {
    className,
    onClick,
  }

  return (
    <button {...button}>
      <div className={styles.layout}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.label}>
          <Pixlflip fontSize={16}>{mode}</Pixlflip>
        </div>
        <div className={styles.meta}></div>
      </div>
    </button>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushMode)
