import React from "react"

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

import { connect } from "react-redux"

import Divider from "../components/divider"
import Editor from "../components/editor"
import Frame from "../components/frame"
import Header from "../components/header"
import Play from "../components/play"
import Player from "../components/player"
import Snapshot from "../components/snapshot"
import Stop from "../components/stop"
import Worker from "../components/worker"

import actions from "../actions"
import colors from "@itsy.studio/palettes/pico8/original.es6"
import thunks from "../thunks"

import { activeDisk } from "../store/disks"
import { screenOrientation } from "../store/screen"
import { WorkerState, workerSelector } from "../store/worker"

const mapStateToProps = state => ({
  disk: activeDisk(state),
  orientation: screenOrientation(state),
  drive: undefined,
  running: false,
  worker: workerSelector(state)
})

const mapDispatchToProps = dispatch => ({
  edit: lua => dispatch(thunks.edit(lua)),
  play: () => dispatch(thunks.play()),
  snap: edit => dispatch(actions.snap(edit)),
  stop: () => dispatch(thunks.stop()),
});

export function CodeScreen({
  disk,
  drive,
  navigation,
  orientation,
  running,
  play,
  snap,
  stop,
  edit,
  worker,
}) {

  const onMoveDivider = (x, y) => console.log(x, y)
  return (
    <Frame shallow>
      <View style={[styles.container, styles[orientation]]}>

        <View style={styles.editorContainer}>
          <View style={styles.controls}>
            <View style={styles.button}>
              {running ? <Stop onPress={stop} /> : <Play onPress={play} />}
            </View>
          </View>
          <Editor
            lua={disk.lua}
            onChange={edit}
            onPlay={play}
            onStop={stop}
            running={running}
          />
        </View>
        <Divider orientation={orientation} onMove={onMoveDivider}>

        </Divider>
        <Snapshot />
        {(true) ? (
          <></>
        ) : worker.running ? (
          <Worker />
        ) : (
          <Player
            disk={disk}
            edit={drive}
            onSnap={snapshot => snap({
              id: drive.id,
              snapshot,
            })}
          />
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
