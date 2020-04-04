import {
  changePencilSize,
  PencilSizes,
  PencilState,
  selectPencil,
} from "@highvalley.systems/itsydraw/store/pencil"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-pencil-size.module.scss"

interface ToolboxToolPencilSizeProps {
  pencil: PencilState
  changePencilSize: (s: PencilSizes) => void
}

const mapStateToProps = (state) => ({
  pencil: selectPencil(state),
})

const mapDispatchToProps = {
  changePencilSize,
}

const sizes = [1, 2, 4, 8]

export function ToolboxToolPencilSize({
  changePencilSize,
  pencil,
}: ToolboxToolPencilSizeProps): React.ReactElement {
  return (
    <div className={styles.sizes}>
      {sizes.map((s) => {
        const className = cx(styles.size, {
          [styles.active]: s === pencil.size,
        })

        const onClick = React.useCallback(() => {
          changePencilSize(s as PencilSizes)
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
)(ToolboxToolPencilSize)
