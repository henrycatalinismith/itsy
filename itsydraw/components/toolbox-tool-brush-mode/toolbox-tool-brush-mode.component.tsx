import {
  BrushModes,
  selectActiveBrushMode,
  selectBrushes,
  handleBrushModeTap,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode.module.scss"

export interface ToolboxToolBrushModeProps {
  mode: BrushModes
  rank?: number
  active?: boolean
  icon?: React.ReactElement
  meta?: React.ReactElement
  handleBrushModeTap?: (mode: BrushModes) => void
}

const mapStateToProps = (state, { mode }) => ({
  active: selectActiveBrushMode(state) === mode,
  rank: selectBrushes(state)[mode].rank,
})

const mapDispatchToProps = {
  handleBrushModeTap,
}

export function ToolboxToolBrushMode({
  mode,
  rank,
  active,
  icon = <></>,
  meta = <></>,
  handleBrushModeTap,
}: ToolboxToolBrushModeProps): React.ReactElement {
  const className = cx(styles.component, {
    [styles.active]: active,
  })

  const onClick = React.useCallback(() => handleBrushModeTap(mode), [])

  const gridArea = [rank + 1, 1, rank + 1, 1].join(" / ")
  const style = { gridArea }

  const button: React.HTMLAttributes<HTMLButtonElement> = {
    className,
    onClick,
    style,
  }

  return (
    <button {...button}>
      <div className={styles.layout}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.label}>
          <Pixlflip fontSize={24}>{mode}</Pixlflip>
        </div>
        <div className={styles.meta}>{meta}</div>
      </div>
    </button>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushMode)
