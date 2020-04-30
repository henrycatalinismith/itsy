import { WebviewIds } from "@highvalley.systems/itsyexpo/store/webviews"
import React from "react"
import { WebView, WebViewProps } from "react-native-webview"
import styles from "./webview-bridge.module.scss"

export interface WebviewApp {
  dispatch: (id: string, ...payload: any[]) => void
}

export interface WebviewBridgeEvents {
  [name: string]: (payload: any, app: WebviewApp) => any
}

export interface WebviewBridgeProps {
  id: WebviewIds
  events: WebviewBridgeEvents
  uri: string
  app?: any
}

export function WebviewBridge({ events, id, uri }: WebviewBridgeProps) {
  const app = React.useRef<WebviewApp>()
  const ref = React.useRef<WebView>()

  const bounces = false
  const originWhitelist = ["*"]
  const scrollEnabled = false
  const source = { uri }
  const style = styles.component

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
  }

  const props: WebViewProps = {
    bounces,
    onMessage,
    originWhitelist,
    scrollEnabled,
    source,
    style,
  }

  return React.useMemo(() => <WebView ref={ref} {...props} />, [])
}

export default WebviewBridge
