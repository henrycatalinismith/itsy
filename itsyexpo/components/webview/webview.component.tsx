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

  loaderStyle?: any

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
  events,
  finishLoadingWebview,
  id,
  loadWebview,
  loaderStyle,
  stopWebview,
  style,
  uri,
  webview,
}: WebviewProps) {
  React.useEffect(() => {
    if (webview.status === WebviewStatuses.Offline) {
      loadWebview(webview.id)
    }
  }, [webview.status])

  React.useEffect(() => {
    return () => stopWebview(webview.id)
  }, [])

  const externalStart = events["webview/start"] || _.noop
  const onWebviewStart = React.useCallback((...args) => {
    externalStart(...args)
    finishLoadingWebview(webview.id)
  }, [])
  events["webview/start"] = onWebviewStart

  const bridgeStatuses = [WebviewStatuses.Loading, WebviewStatuses.Online]
  const loaderStatuses = [WebviewStatuses.Loading, WebviewStatuses.Offline]

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
        {loaderStatuses.includes(webview.status) && (
          <WebviewLoader style={loaderStyle} />
        )}
      </View>
    ),
    [webview.status, uri]
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Webview)
