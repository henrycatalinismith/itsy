import React from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"

import Divider from "@itsy.studio/studio/components/divider"
import Editor from "@itsy.studio/studio/components/editor"
import Frame from "@itsy.studio/studio/components/frame"
import Header from "@itsy.studio/studio/components/header"
import Play from "@itsy.studio/studio/components/play"
import Player from "@itsy.studio/studio/components/player"
import Snapshot from "@itsy.studio/studio/components/snapshot"
import Stop from "@itsy.studio/studio/components/stop"
import Worker from "@itsy.studio/studio/components/worker"

import colors from "@itsy.studio/palettes/pico8/original.es6"

import { playerSelector } from "@itsy.studio/studio/store/player"
import { screenOrientation } from "@itsy.studio/studio/store/screen"
import { workerSelector } from "@itsy.studio/studio/store/worker"

const mapStateToProps = state => ({
  orientation: screenOrientation(state),
  player: playerSelector(state),
  worker: workerSelector(state),
})

const mapDispatchToProps = {
}

export function CodeScreen({
  orientation,
  player,
  worker,
}) {

  return (
    <Frame shallow>
      <View style={[styles.container, styles[orientation]]}>

        <View style={styles.editorContainer}>
          <View style={styles.controls}>
            <View style={styles.button}>
              {player.running ? <Stop /> : <Play />}
            </View>
          </View>
          <Editor />
        </View>

        <Divider />

        {(worker.running || player.waiting) ? (
          <Worker />
        ) : (player.running || player.stopping) ? (
          <Player />
        ) : (
          <Snapshot />
        )}

      </View>
    </Frame>
  )
}

CodeScreen.navigationOptions = {
  header: Header
}

const styles = StyleSheet.create({
  editorContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    backgroundColor: colors[15],
    borderBottomColor: colors[13],
    borderBottomWidth: 2,
  },

  button: {
  },

  container: {
    flex: 1,
    backgroundColor: colors[7],
  },
  landscape: {
    flexDirection: "row",
  },
  portrait: {
    flexDirection: "column",
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CodeScreen)
