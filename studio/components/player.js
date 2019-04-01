import Base64 from "base-64"
import React from "react"
import PropTypes from "prop-types"

import {
  Image,
  StyleSheet,
  Text,
  WebView,
  View,
} from "react-native"

const blob = require("../node_modules/@highvalley.systems/itsy/engine/base64.js")
const itsy = Base64.decode(blob)

import colors from "../constants/colors"

export default class Player extends React.Component {
  static propTypes = {
    edit: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = {
      rebooting: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.edit || !nextProps.edit) {
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
      }, 1000)
      return false
    }

    if (nextState.stopped) {
      return true
    }

    return false
  }

  render() {
    const { rebooting, stopped } = this.state
    const { edit } = this.props

    const handleMessage = event => {
      const message = JSON.parse(event.nativeEvent.data)
      console.log(`💃 ${message.type}`)
      console.log(message)
      switch (message.type) {
        case "snapshot":
          console.log("SNAPSHOOSOSOSOS")
          console.log(message.uri)
          console.log(message.keys)
          return
      }
    }

    console.log(edit && edit.stopped)

    return (
      <View style={styles.container}>
        <View style={styles.screen}>
          {edit && stopped && (
            <>
              <Text style={{ flex: 1 }}>stopped</Text>
              <Image
                resizeMode="contain"
                source={{ uri: `data:image/gif;base64,${edit.snapshot}` }}
                style={styles.snapshot}
              />
            </>
          )}

          {edit && !edit.stopped && (
            <WebView
              ref={(view) => { this.webview = view; }}
              bounces={false}
              scrollEnabled={false}
              onMessage={handleMessage}
              source={{ html: `
                <!DOCTYPE html>
                <html>
                <head>
                <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=device-width">
                </head>
                <body>
                <script type="text/lua">
                  ${edit.lua}
                </script>
                <img width="8" height="8" src="data:image/png;base64,${edit.palette}" />
                <img width="128" height="128" src="data:image/png;base64,${edit.spritesheet}" />
                <canvas width="128" height="128"></canvas>
                <style type="text/css">
                html {
                  background-color: black;
                  overflow: hidden;
                  user-select: none;
                }

                body {
                  margin: 0;
                  display: flex;
                  overflow: hidden;
                  justify-content: center;
                  align-items: center;
                  user-select: none;
                  width: 100vw;
                  height: 100vh;
                }

                @media (orientation: landscape) {
                  body {
                    align-items: center;
                  }
                }

                @media (orientation: portrait) {
                  body {
                    align-items: flex-start;
                  }
                }

                canvas {
                  /* https://bugs.webkit.org/show_bug.cgi?id=193895 */
                  image-rendering: pixelated;
                  user-select: none;
                  width: 100vmin;
                  height: 100vmin;
                }

                img {
                  display: none;
                }
                </style>
                </body>
                </html>


              ` }}
              injectedJavaScript={itsy}
              useWebKit
            />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  screen: {
    flex: 1,
    borderTopColor: colors[1],
    borderRightColor: colors[1],
    borderBottomColor: colors[1],
    borderLeftColor: colors[1],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  snapshot: {
    flex: 1,
  },
})

