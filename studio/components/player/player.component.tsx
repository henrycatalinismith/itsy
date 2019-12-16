import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"

import disks from "@itsy.studio/studio/store/disks"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import styles from "@itsy.studio/studio/components/player/player.module.scss"

interface PlayerProps {
  player: PlayerState
  snapshot: (uri: string) => void
}

const mapStateToProps = (state) => ({
  player: playerSelector(state),
})

const mapDispatchToProps = {
  snapshot: disks.actions.snapshot,
}

export function Player({ player, snapshot }: PlayerProps) {
  const webview = React.useRef()

  React.useEffect(() => {
    if (player.stopping) {
      console.log("triggering snapshot")
      webview.current.injectJavaScript(`
        itsy.pauseMainLoop()

        const colors = [
          "#000000",
          "#1D2B53",
          "#7E2553",
          "#008751",
          "#AB5236",
          "#5F574F",
          "#C2C3C7",
          "#FFF1E8",
          "#FF004D",
          "#FFA300",
          "#FFEC27",
          "#00E436",
          "#29ADFF",
          "#83769C",
          "#FF77A8",
          "#FFCCAA",
        ]

        const tmp = document.createElement("canvas")
        tmp.width = 128
        tmp.height = 128
        const ctx = tmp.getContext("2d")
        for (let x = 0; x < 128; x++) {
          for (let y = 0; y < 128; y++) {
            const c = itsy._pget(x, y)
            ctx.fillStyle = colors[c]
            ctx.fillRect(x, y, 128, 128)
          }
        }
  
        window.postMessage(JSON.stringify({
          type: "snapshot",
          uri: tmp.toDataURL("image/png"),
        }))

      `)
    }
  }, [player.stopping])

  const onMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data)
    console.log(`💃 ${message.type}`)
    snapshot(message.uri)
  }

  const injectedJavaScript = `(function() {
    window.postMessage = window.ReactNativeWebView.postMessage
  })()`

  const source = { html: player.html }
  // const source = { html: "<h1 style='font-size: 128px'>lol</h1>" }

  const webviewProps = {
    ref: webview,
    bounces: false,
    injectedJavaScript,
    onMessage,
    scrollEnabled: false,
    source,
  }

  return React.useMemo(
    () => (
      <View style={styles.player}>
        <WebView {...webviewProps} />
      </View>
    ),
    []
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)

/*
export default class Player extends React.Component {
  static propTypes = {
    disk: PropTypes.any,
    edit: PropTypes.any,
    onSnap: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = {
      rebooting: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.disk.id)
    if (this.props.disk.id !== nextProps.disk.id) {
      console.log("different disk")
      return true
    }

    if (!this.props.edit || !nextProps.edit) {
      console.log("different edit")
      return true
    }

    const thisEdit = this.props.edit
    const nextEdit = nextProps.edit

    const { lua } = this.props.edit

    const play = thisEdit.stopped && !nextEdit.stopped
    const stop = !thisEdit.stopped && nextEdit.stopped

    const beginReboot = !this.state.rebooting && nextState.rebooting
    const endReboot = this.state.rebooting && !nextState.rebooting

    if (beginReboot || endReboot) {
      console.log("reboot started or ended")
      return true
    }

    if (play) {
      this.setState({ rebooting: true })
      setTimeout(() => {
        this.setState({
          rebooting: false,
          stopped: false,
        })
      }, 10)
      console.log("rebooting to play")
      return true
    }

    if (stop) {
      this.webview.postMessage(JSON.stringify({
        type: "stop",
      }))
      setTimeout(() => {
        this.setState({
          stopped: true,
        })
      }, 100)
      console.log("stopping")
      return false
    }

    if (nextState.stopped) {
      console.log("stopped")
      return true
    }

    console.log("fuck off")
    return false
  }

  render() {
    const { rebooting, stopped } = this.state
    const { edit, onSnap } = this.props

    const handleMessage = event => {
      const message = JSON.parse(event.nativeEvent.data)
      console.log(`💃 ${message.type}`)
      //console.log(message)
      switch (message.type) {
        case "snapshot":
          //console.log("SNAPSHOOSOSOSOS")
          //console.log(message.uri)
          //console.log(message.keys)
          onSnap(message.uri)
          return
      }
    }

    let mode
    if (edit && stopped) {
      mode = "snapshot"
    } else if (edit && !edit.stopped) {
      mode = "player"
    }
    //console.log(edit && edit.stopped)

    return (
      <View style={styles.container}>
        <View style={styles.screen}>
          {mode === "snapshot" && (
            <WebView
              source={{ html: `
                <!DOCTYPE html>
                <html>
                <head>
                <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=device-width">
                </head>
                <body>
                <style type="text/css">
                  html {
                    overflow: hidden;
                    user-select: none;
                  }

                  body {
                    background-color: #111;
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    overflow: hidden;
                    user-select: none;
                  }

                  img {
                    width: 100vmin;
                    height: 100vmin;
                    image-rendering: pixelated;
                  }
                </style>
                <img src="${edit.snapshot}" />
                </body>
                </html>
              ` }}
              useWebKit
            />
          )}

          {mode === "player" && (
            <WebView
              ref={(view) => { this.webview = view; }}
              bounces={false}
              scrollEnabled={false}
              onMessage={handleMessage}
              source={{ html: "<h1>hello</h1>" }}
              useWebKit
              style={styles.screen}
            />
          )}
        </View>
      </View>
    )
  }
}

*/
