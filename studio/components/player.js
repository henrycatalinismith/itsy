import Base64 from "base-64"
import React from "react"

import {
  StyleSheet,
  Text,
  WebView,
  View,
} from "react-native"

const blob = require("../node_modules/@highvalley.systems/itsy/engine/base64.js")
const itsy = Base64.decode(blob)

import colors from "../constants/colors"

export default ({ disk }) => {
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <WebView
          bounces={false}
          scrollEnabled={false}
          source={{ html: `
            <!DOCTYPE html>
            <html>
            <head>
            <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=device-width">
            </head>
            <body>
            <script type="text/lua">
              ${disk.lua}
            </script>
            <img width="8" height="8" src="data:image/png;base64,${disk.palette}" />
            <img width="128" height="128" src="data:image/png;base64,${disk.spritesheet}" />
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
      </View>
    </View>
  )
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
  controls: {
    height: 32,
    backgroundColor: colors[13],
    borderBottomColor: colors[1],
    borderBottomWidth: 2,
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
  }
})

