export interface WebviewBridgeMiddlewareOptions {
  slices: Object
  thunks?: Object
}

function createWebviewBridgeMiddleware({
  slices,
  thunks = {},
}: WebviewBridgeMiddlewareOptions): any {
  const isReactNative = !!(window as any).ReactNativeWebView
  ;(window as any).slices = {}
  ;(window as any).thunks = {}

  Object.entries(slices).forEach(([key, value]) => {
    ;(window as any).slices[key] = value
  })

  Object.entries(thunks).forEach(([key, value]) => {
    ;(window as any).thunks[key] = value
  })

  if (isReactNative) {
    ;(window as any).consoleLogs = []

    setInterval(() => {
      if ((window as any).consoleLogs.length > 0) {
        ;(window as any).ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "console/log",
            payload: (window as any).consoleLogs,
          })
        )
        ;(window as any).consoleLogs = []
      }
    }, 100)
    ;(window as any).console.log = (l) => {
      ;(window as any).consoleLogs.push(JSON.stringify(l))
    }
  }

  const webviewMiddleware = (store) => (next) => (action) => {
    next(action)

    const isFromWebviewBridge = action.__fromWebviewBridge
    const shouldPostMessage = isReactNative && !isFromWebviewBridge

    if (shouldPostMessage) {
      const message = JSON.stringify(action)
      ;(window as any).ReactNativeWebView.postMessage(message)
    }

    ;(window as any).store = store
  }

  return webviewMiddleware
}

export default createWebviewBridgeMiddleware
