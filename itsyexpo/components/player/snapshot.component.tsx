import { RootState } from "@highvalley.systems/itsyexpo/store"
import delay from "delay"
import { Disk, playDisk } from "@highvalley.systems/itsyexpo/store/disks"
import { PlayerModes } from "@highvalley.systems/itsyexpo/store/player"
import Font from "@highvalley.systems/itsyexpo/components/font"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import React from "react"
import { ActivityIndicator } from "react-native"
import { WebView } from "react-native-webview"
import { Path, Svg } from "react-native-svg"
import { TouchableHighlight, View } from "react-native"
import { connect } from "react-redux"
import styles from "./snapshot.module.scss"

interface SnapshotProps {
  disk: Disk
  playDisk: (disk: Disk) => void
  playerMode: PlayerModes
}

const mapStateToProps = (state: RootState) => ({
  playerMode: state.player.mode,
})

const mapDispatchToProps = {
  playDisk,
}

export function Snapshot({ disk, playDisk, playerMode }: SnapshotProps) {
  const [active, setActive] = React.useState(false)

  const onPressIn = React.useCallback(() => {
    setActive(true)
  }, [])

  const onPress = React.useCallback(async () => {
    if ([PlayerModes.Halt, PlayerModes.Idle].includes(playerMode)) {
      setActive(true)
      await delay(10)
      playDisk(disk)
    }
  }, [disk])

  React.useEffect(() => {
    if ([PlayerModes.Halt, PlayerModes.Idle].includes(playerMode)) {
      setActive(false)
    }
  }, [playerMode])

  return (
    <View style={styles.component}>
      {React.useMemo(
        () => (
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
              -webkit-touch-callout: none;
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
              opacity: 0.1;
              width: 100vmin;
              height: 100vmin;
              image-rendering: pixelated;
              user-select: none;
              -webkit-touch-callout: none;
            }
          </style>
          <img src="data:image/png;base64,${disk.snapshot}" />
          </body>
          </html>
        `,
            }}
          />
        ),
        [disk.snapshot]
      )}

      <TouchableHighlight
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.6}
      >
        <View style={styles.inner}>
          {active ? (
            <ActivityIndicator color={colors[7]} size="large" />
          ) : (
            <>
              <Svg
                style={styles.icon}
                width={64}
                height={64}
                viewBox="0 0 40 48"
              >
                <Path
                  d="M8,8 L32,24 L8,40 L8,8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={8}
                  stroke={colors[3]}
                />
                <Path
                  d="M8,8 L32,24 L8,40 L8,8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke={colors[1]}
                  fill={colors[11]}
                />
              </Svg>

              <View style={styles.play}>
                <Font fontSize={32}>play</Font>
              </View>
            </>
          )}
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Snapshot)
