import WebviewBridge, {
  WebviewApp,
  WebviewBridgeEvents,
  WebviewBridgeProps,
} from "@highvalley.systems/itsyexpo/components/webview-bridge"
import { selectHelpPanelPath } from "@highvalley.systems/itsyexpo/store/panels"
import { Asset } from "expo-asset"
import React from "react"
import { connect } from "react-redux"
import styles from "./help-panel-webview.module.scss"

interface HelpPanelWebviewProps {
  path: string
}

const html = Asset.fromModule(require("../../assets/webviews/itsyhelp.html"))

const mapStateToProps = (state) => ({
  path: selectHelpPanelPath(state),
})

const mapDispatchToProps = {}

export function HelpPanelWebview({ path }: HelpPanelWebviewProps) {
  const app = React.useRef<WebviewApp>()

  React.useEffect(() => {
    if (app.current) {
      app.current.dispatch("location/navigate", path)
    }
  }, [path])

  const events: WebviewBridgeEvents = {
    "webview/start": async function($1, a: WebviewApp): Promise<void> {
      app.current = a
    },

    // "text/change": async (payload: any): Promise<void> => {
    // },
  }

  const id = "itsyhelp"
  const style = styles.component
  const uri = html.uri

  const props: WebviewBridgeProps = {
    id,
    events,
    style,
    uri,
  }

  return <WebviewBridge {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpPanelWebview)
