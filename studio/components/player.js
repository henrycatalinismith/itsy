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

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
      </View>
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
              function _init()
                tick = 0
              end

              function _update()
                tick = tick + 1
                if tick > 1000 then
                  lololol()
                end
              end

              function _draw()
                cls(12)
                sspr(0, 0, 16, 8, 64, 64)
                sspr(3, 8+(loop(32,8)*3), 13, 3, 64 + 3, 64 - 1)
                sspr(0, 8+loop(8,8)*3, 3, 3, 64, 66)
              end

              function loop(interval, limit)
                remainder = tick % interval
                chunk_size = flr(interval / limit)
                local num = flr(remainder / chunk_size)
                return num
              end
            </script>
            <img width="8" height="8" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAa0lEQVQoU2NkYGD4L6sdzJD4h4Fhf+I/hsMV6xkZkADj6iCz/1tYJRmScyoYrPUUGZj5JVAVvPXw/s8R/YyBI4SZoeSTCkO/+ApUBVZrf//3PLmQIfsfNwN3BDMDu0kYqgJk+7CxUVTTRgEAxuwaCSbl+0MAAAAASUVORK5CYII=" />
            <img width="128" height="128" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAC0ElEQVR4Ae3dMW7UQBSH8QnKJRAcggoJCbiCtZWrlYu06ZCicILdA2zrIqJKhXIFb2GJikOQayCKZ96On8czY7shzPfTarWKxxPpvZn/ax3+XU1dhR8cdsvWL92/JFezT7TKX78HHu2fnXPu7Y9AS6brU13sPt455z5/+lBqF8yJPuzk09RVU1fusOvOfXfu7YJf7823rk//u/H+l0+hN0BP9Lc3bv88+pY/jk+3RMfDu1d2s7/r7Yk+7IZrIf8otX+RDZDy+bUI8gqkCR7ohFnvNzg4DH7+HrZ6fCp0BkznoV/WeIH8d20ztAHOuf1z8+W1WSk7F1j39BAelTWvQKaL+tblrnj7DDlWcOmHBnTn/hLWGXR9U1c3t/ejrI+uj6+RH+3pWFpLrrRGWtAIKZCpqZZPTMsd7IH/1qIT8H9G0Op7ECmrf6K7c9+ejn6DSy56+AYsrb6E+M3tfU7CJGOq2MZcm6mYTCEtkBxtSaR4BFH0rAZoQZduYebBXD9Mg4mgrTNAMz3nxfj+2jOdGSXOgKaukvkjBTLVTEZQsPpE0NCAdRM4J9mlYTqlTYOJoFEEraC13l5K2ao9HdcNoRd/AzKXSoGmUzQeQXN9IoK23oBkBJkTnRwVzIBlM0AzPf56zv7aGxnyxd0AqZEZknMp9PD4ZGqaPNrBHhBBowhafQ8iZfVPdHfu29PRbzARZG/A0uo3dSUzOSdhkjFVbGOu9ZcWNP6CFkiOtiTSiulKBNkGaEGXbmHmwVw/TIOJoK0zQDM958X4/toznRklzoCmrpL5IwUy1UxGULD6RNDQgHUTOCfZpWE6pU2DiaBRBK2gtd5eStmqPR3XDaEXfwMyl0qBplM0HkFzfSKCtt6AZASZE50cFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOv8Aelf4iwazcZHAAAAEHRFWHRMb2RlUE5HADIwMTEwMjIx41m2wQAAAABJRU5ErkJggg==" />
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

