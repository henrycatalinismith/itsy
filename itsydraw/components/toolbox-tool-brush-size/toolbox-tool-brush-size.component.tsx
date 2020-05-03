import {
  changeBrushSize,
  BrushSizes,
  selectBrushSize,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-size.module.scss"

interface ToolboxToolBrushSizeProps {
  brushSize: BrushSizes
  changeBrushSize: (s: BrushSizes) => void
}

const mapStateToProps = (state) => ({
  brushSize: selectBrushSize(state),
})

const mapDispatchToProps = {
  changeBrushSize,
}

const sizes = [1, 2, 4, 8]

export function ToolboxToolBrushSize({
  brushSize,
  changeBrushSize,
}: ToolboxToolBrushSizeProps): React.ReactElement {
  return (
    <div className={styles.component}>
      {sizes.map((s) => {
        const className = cx(styles.size, {
          [styles.active]: s === brushSize,
        })

        const onClick = React.useCallback(() => {
          changeBrushSize(s as BrushSizes)
        }, [])

        const button: React.HTMLAttributes<HTMLButtonElement> = {
          className,
          onClick,
        }

        return (
          <button key={s} {...button}>
            <Pixlflip fontSize={16}>{`${s.toString()}x`}</Pixlflip>
          </button>
        )
      })}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushSize)
