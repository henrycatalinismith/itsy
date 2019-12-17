import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import { connect } from "react-redux"
import { Disk, activeDisk } from "@itsy.studio/studio/store/disks"
import styles from "@itsy.studio/studio/components/snapshot/snapshot.module.scss"

interface SnapshotProps {
  disk: Disk
}

const mapStateToProps = (state) => ({
  disk: activeDisk(state),
})

export function Snapshot({ disk }: SnapshotProps) {
  return (
    <View style={styles.snapshot}>
      <WebView
        style={styles.webview}
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
    </View>
  )
}

export default connect(mapStateToProps)(Snapshot)
