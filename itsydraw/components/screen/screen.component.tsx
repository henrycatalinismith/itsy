import ScreenSpritesheet from "@highvalley.systems/itsydraw/components/screen-spritesheet"
import React from "react"
import { connect } from "react-redux"
import styles from "./screen.module.scss"

interface ScreenProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function Screen({}: ScreenProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <ScreenSpritesheet />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
