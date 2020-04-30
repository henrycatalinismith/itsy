import WebviewBridge, {
  WebviewBridgeEvents,
  WebviewBridgeProps,
} from "@highvalley.systems/itsyexpo/components/webview-bridge"
import WebviewLoader from "@highvalley.systems/itsyexpo/components/webview-loader"
import {
  _Webview,
  WebviewIds,
  loadWebview,
  finishLoadingWebview,
  stopWebview,
  WebviewStatuses,
} from "@highvalley.systems/itsyexpo/store/webviews"
import _ from "lodash"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./webview.module.scss"

export interface WebviewProps {
  id: WebviewIds
  events: WebviewBridgeEvents
  uri: string
  style: any

  webview: _Webview
  loadWebview: (id: WebviewIds) => void
  finishLoadingWebview: (id: WebviewIds) => void
  stopWebview: (id: WebviewIds) => void
}

const mapStateToProps = (state, { id }) => ({
  webview: state.webviews[id],
})

const mapDispatchToProps = {
  loadWebview,
  finishLoadingWebview,
  stopWebview,
}

export function Webview({
  webview,
  loadWebview,
  finishLoadingWebview,
  stopWebview,
  events,
  id,
  style,
  uri,
}: WebviewProps) {
  const onMount = () => loadWebview(webview.id)
  const onUnmount = () => stopWebview(webview.id)
  const onStart = () => finishLoadingWebview(webview.id)

  React.useEffect(() => {
    onMount()
    return () => onUnmount()
  }, [])

  const externalStart = events["webview/start"] || _.noop
  const onWebviewStart = React.useCallback((...args) => {
    externalStart(...args)
    onStart()
  }, [])
  events["webview/start"] = onWebviewStart

  const bridgeStatuses = [WebviewStatuses.Loading, WebviewStatuses.Online]

  const loaderStatuses = [WebviewStatuses.Loading]

  const bridgeProps: WebviewBridgeProps = {
    id,
    uri,
    events,
  }

  return React.useMemo(
    () => (
      <View style={[styles.component, style]}>
        {bridgeStatuses.includes(webview.status) && (
          <WebviewBridge {...bridgeProps} />
        )}
        {loaderStatuses.includes(webview.status) && <WebviewLoader />}
      </View>
    ),
    [webview.status, uri]
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Webview)
