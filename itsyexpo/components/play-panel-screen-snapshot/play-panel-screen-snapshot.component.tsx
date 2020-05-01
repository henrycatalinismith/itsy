import {
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import styles from "./play-panel-screen-snapshot.module.scss"

interface PlayPanelScreenSnapshotProps {
  disk: Disk
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

export function PlayPanelScreenSnapshot({
  disk,
}: PlayPanelScreenSnapshotProps) {
  return (
    <WebView
      style={styles.component}
      source={{
        html: `
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
        <img src="data:image/png;base64,${disk.snapshot}" />
        </body>
        </html>
      `,
      }}
    />
  )
}

export default connect(mapStateToProps)(PlayPanelScreenSnapshot)
