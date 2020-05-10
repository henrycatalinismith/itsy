import {
  changeBrushMode,
  BrushModes,
  selectActiveBrushMode,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-picker.module.scss"

interface ToolboxToolBrushModePickerProps {
  brushMode: BrushModes
  changeBrushMode: (s: BrushModes) => void
}

const mapStateToProps = (state) => ({
  brushMode: selectActiveBrushMode(state),
})

const mapDispatchToProps = {
  changeBrushMode,
}

const modes = [BrushModes.Pencil, BrushModes.Line, BrushModes.Circle]

export function ToolboxToolBrushModePicker({
  brushMode,
  changeBrushMode,
}: ToolboxToolBrushModePickerProps): React.ReactElement {
  return (
    <div className={styles.component}>
      {modes.map((m) => {
        const className = cx(styles.mode, {
          [styles.active]: m === brushMode,
        })

        const onClick = React.useCallback(() => {
          changeBrushMode(m)
        }, [])

        const button: React.HTMLAttributes<HTMLButtonElement> = {
          className,
          onClick,
        }

        return (
          <button key={m} {...button}>
            <Pixlflip fontSize={16}>{`${m.toString()}`}</Pixlflip>
          </button>
        )
      })}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModePicker)
