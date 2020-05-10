import {
  LineAngles,
  selectLineBrushAngle,
  changeLineBrushAngle,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-mode-options-line-angle.module.scss"

interface ToolboxToolBrushModeOptionsLineAngleProps {
  angle: LineAngles
  changeLineBrushAngle: (a: LineAngles) => void
}

const mapStateToProps = (state) => ({
  angle: selectLineBrushAngle(state),
})

const mapDispatchToProps = {
  changeLineBrushAngle,
}

const angles = [LineAngles.Free, LineAngles.Snap]

export function ToolboxToolBrushModeOptionsLineAngle({
  angle,
  changeLineBrushAngle,
}: ToolboxToolBrushModeOptionsLineAngleProps): React.ReactElement {
  return (
    <div className={styles.component}>
      {angles.map((a) => {
        const className = cx(styles.size, {
          [styles.active]: a === angle,
        })

        const onClick = React.useCallback(() => {
          changeLineBrushAngle(a as LineAngles)
        }, [])

        const button: React.HTMLAttributes<HTMLButtonElement> = {
          className,
          onClick,
        }

        return (
          <button key={a} {...button}>
            <Pixlflip fontSize={16}>{`${a.toString()}`}</Pixlflip>
          </button>
        )
      })}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushModeOptionsLineAngle)
