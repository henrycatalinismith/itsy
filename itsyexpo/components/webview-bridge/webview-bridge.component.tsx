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
  events: WebviewBridgeEvents
  id: string
  uri: string
  app?: any
  style?: any
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function WebviewBridge({ events, id, style, uri }: WebviewBridgeProps) {
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

  return React.useMemo(() => <WebView ref={ref} {...props} />, [uri])
}

export default connect(mapStateToProps, mapDispatchToProps)(WebviewBridge)
