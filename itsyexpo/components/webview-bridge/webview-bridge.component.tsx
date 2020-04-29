import {
  Webview,
  WebviewIds,
  loadWebview,
  finishLoadingWebview,
  stopWebview,
  WebviewStatuses,
} from "@highvalley.systems/itsyexpo/store/webviews"
import React from "react"
import { WebView, WebViewProps } from "react-native-webview"
import { connect } from "react-redux"

export interface WebviewApp {
  dispatch: (id: string, ...payload: any[]) => void
}

export interface WebviewBridgeEvents {
  [name: string]: (payload: any) => any
}

export interface WebviewBridgeProps {
  webview?: Webview
  loadWebview: (id: WebviewIds) => void
  finishLoadingWebview: (id: WebviewIds) => void
  stopWebview: (id: WebviewIds) => void
  events: WebviewBridgeEvents
  id: WebviewIds
  uri: string
  app?: any
  style?: any
}

const mapStateToProps = (state, { id }) => ({
  webview: state.webviews[id],
})

const mapDispatchToProps = {
  loadWebview,
  finishLoadingWebview,
  stopWebview,
}

export function WebviewBridge({
  webview,
  loadWebview,
  finishLoadingWebview,
  stopWebview,
  events,
  id,
  style,
  uri,
}: WebviewBridgeProps) {
  const app = React.useRef<WebviewApp>()
  const ref = React.useRef<WebView>()

  const bounces = false
  const originWhitelist = ["*"]
  const scrollEnabled = false
  const source = { uri }

  const defaultEvents: WebviewBridgeEvents = {
    "console/log": async (payload: any[]): Promise<void> => {
      payload.forEach((log) => console.log(log))
    },
  }

  const dispatch = (id: string, ...payload: any[]) => {
    let javaScript = ""
    if (id.includes("/")) {
      const [slice, type] = id.split("/")
      javaScript = `
        (() => {
          const actionCreator = window.slices[${JSON.stringify(
            slice
          )}].actions.${type}
          const action = actionCreator.apply(undefined, ${JSON.stringify(
            payload
          )})
          action.__fromWebviewBridge = true
          store.dispatch(action)
        })()
      `
    } else {
      javaScript = `
        (() => {
          const thunk = window.thunks[${JSON.stringify(id)}]
          const action = thunk.apply(undefined, ${JSON.stringify(payload)})
          store.dispatch(action)
        })()
      `
    }
    console.log(javaScript)
    ref.current.injectJavaScript(javaScript)
  }

  React.useEffect(() => {
    if (webview.status === WebviewStatuses.Offline) {
      loadWebview(webview.id)
    }
    return () => stopWebview(webview.id)
  }, [])

  React.useEffect(() => {
    app.current = { dispatch }
  }, [])

  const onMissing = (type: string, payload: any): void => {
    // console.log(
    // `🌍 <WebviewBridge id="${id}" />: No handler for message type "${type}"`
    // )
  }

  const onMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data)
    const type = message.type || ""
    const handler =
      events[type] || defaultEvents[type] || onMissing.bind(undefined, type)
    console.log(`<WebviewBridge id="${id}" /> 💌  ${type}`)
    handler.call(ref.current, message.payload, app.current)

    if (type === "webview/start") {
      finishLoadingWebview(webview.id)
    }
  }

  const props: WebViewProps = {
    bounces,
    onMessage,
    originWhitelist,
    scrollEnabled,
    source,
    style,
  }

  return React.useMemo(
    () =>
      [WebviewStatuses.Loading, WebviewStatuses.Online].includes(
        webview.status
      ) && <WebView ref={ref} {...props} />,
    [webview.status, uri]
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WebviewBridge)
