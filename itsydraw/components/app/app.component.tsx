import Screen from "@highvalley.systems/itsydraw/components/screen"
import Toolbox from "@highvalley.systems/itsydraw/components/toolbox"
import {
  selectWebview,
  WebviewState,
} from "@highvalley.systems/itsydraw/store/webview"
import React from "react"
import { connect } from "react-redux"
import styles from "./app.module.scss"

interface AppProps {
  webview: WebviewState
}

const mapStateToProps = (state) => ({
  webview: selectWebview(state),
})

const mapDispatchToProps = {}

export function App({ webview }: AppProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <div className={styles.screen}>
        <Screen />
      </div>
      <div className={styles.toolbox}>
        <Toolbox />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
