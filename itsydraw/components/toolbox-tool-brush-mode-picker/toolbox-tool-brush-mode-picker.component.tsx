import ToolboxToolBrushModeButton from "@highvalley.systems/itsydraw/components/toolbox-tool-brush-mode-button"
import {
  ToolboxLayouts,
  selectToolboxLayout,
} from "@highvalley.systems/itsydraw/store/toolbox"
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
  layout: ToolboxLayouts
}

const mapStateToProps = (state) => ({
  brushMode: selectActiveBrushMode(state),
  layout: selectToolboxLayout(state),
})

const mapDispatchToProps = {
  changeBrushMode,
}

const modes = [BrushModes.Pencil, BrushModes.Line, BrushModes.Circle]

function PencilBrushIcon(): React.ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path d="M13 64l-2 2L1 90a7 7 0 009 9l24-10 2-1 48-48 1-1 1-1 12-12c3-3 3-8 0-11L85 2a7 7 0 00-10 0L13 64zm17 9l-3-3 43-43 3 3-43 43z" />
    </svg>
  )
}

export function ToolboxToolBrushModePicker({
  brushMode,
  changeBrushMode,
  layout,
}: ToolboxToolBrushModePickerProps): React.ReactElement {
  return (
    <div className={cx(styles.component, styles[layout])}>
      {modes.map((mode) => {
        const className = cx(styles.mode, {
          [styles.active]: mode === brushMode,
        })

        const onClick = React.useCallback(() => {
          changeBrushMode(mode)
        }, [])

        const button: React.HTMLAttributes<HTMLButtonElement> = {
          className,
          onClick,
        }

        // <button key={m} {...button}>
        // <Pixlflip fontSize={16}>{`${m.toString()}`}</Pixlflip>
        // </button>

        return <ToolboxToolBrushModeButton key={mode} mode={mode} />
      })}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModePicker)
