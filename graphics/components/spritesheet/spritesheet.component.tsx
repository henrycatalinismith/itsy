import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import {
  SpritesheetState,
  selectSpritesheet,
} from "@itsy.studio/graphics/store/spritesheet"
import styles from "./spritesheet.module.scss"

interface SpritesheetProps {
  spritesheet: SpritesheetState
}

const mapStateToProps = (state) => ({
  spritesheet: selectSpritesheet(state),
})

const mapDispatchToProps = {}

export function Spritesheet({
  spritesheet,
}: SpritesheetProps): React.ReactElement {
  return (
    <table className={styles.spritesheet}>
      {_.map(spritesheet, (column, x) => (
        <tr>
          {_.map(column, (pixel, y) => (
            <td>{pixel}</td>
          ))}
        </tr>
      ))}
    </table>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
