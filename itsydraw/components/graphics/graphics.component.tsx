import React from "react"
import { connect } from "react-redux"
import styles from "./graphics.module.scss"

// import { currentPage, navigate } from "@itsy.studio/manual/store/location"

import Palette from "@highvalley.systems/itsydraw/components/palette"
import Spritesheet from "@highvalley.systems/itsydraw/components/spritesheet"
import {
  WebviewState,
  selectWebview,
} from "@highvalley.systems/itsydraw/store/webview"

interface GraphicsProps {
  webview: WebviewState
}

const mapStateToProps = (state) => ({
  webview: selectWebview(state),
})

const mapDispatchToProps = {}

export function Graphics({ webview }: GraphicsProps): React.ReactElement {
  return (
    <div className={styles.graphics}>
      <div className={styles.palette}>
        <Palette />
      </div>
      <div className={styles.spritesheet}>
        {webview.imported && <Spritesheet />}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphics)
