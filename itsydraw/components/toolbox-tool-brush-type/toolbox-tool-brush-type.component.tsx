import {
  changeBrushType,
  BrushTypes,
  selectBrushType,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-brush-type.module.scss"

interface ToolboxToolBrushTypeProps {
  brushType: BrushTypes
  changeBrushType: (s: BrushTypes) => void
}

const mapStateToProps = (state) => ({
  brushType: selectBrushType(state),
})

const mapDispatchToProps = {
  changeBrushType,
}

const types = [BrushTypes.Pencil, BrushTypes.Line, BrushTypes.Circle]

export function ToolboxToolBrushType({
  brushType,
  changeBrushType,
}: ToolboxToolBrushTypeProps): React.ReactElement {
  return (
    <div className={styles.component}>
      {types.map((t) => {
        const className = cx(styles.type, {
          [styles.active]: t === brushType,
        })

        const onClick = React.useCallback(() => {
          changeBrushType(t)
        }, [])

        const button: React.HTMLAttributes<HTMLButtonElement> = {
          className,
          onClick,
        }

        return (
          <button key={t} {...button}>
            <Pixlflip fontSize={16}>{`${t.toString()}`}</Pixlflip>
          </button>
        )
      })}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolBrushType)
