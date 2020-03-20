import Navigator from "@highvalley.systems/itsydraw/components/navigator"
import Palette from "@highvalley.systems/itsydraw/components/palette"
import Spritesheet from "@highvalley.systems/itsydraw/components/spritesheet"
import Toolbox from "@highvalley.systems/itsydraw/components/toolbox"
import Zoom from "@highvalley.systems/itsydraw/components/zoom"
import {
  selectWebview,
  WebviewState,
} from "@highvalley.systems/itsydraw/store/webview"
import React from "react"
import { connect } from "react-redux"
import styles from "./graphics.module.scss"

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
      <div className={styles.spritesheet}>
        {webview.imported && <Spritesheet />}
      </div>
      <div className={styles.toolbox}>
        <Toolbox />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphics)
