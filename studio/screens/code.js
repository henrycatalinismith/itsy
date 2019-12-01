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
import Header from "../components/header"
import Play from "../components/play"
import Player from "../components/player"
import Stop from "../components/stop"

import actions from "../actions"
import colors from "../constants/colors"
import select from "../selectors"
import thunks from "../thunks"

const mapStateToProps = state => {
  const diskId = select.scalars.from(state).diskId()
  //console.log(diskId)
  return {
    disk: select.edits.from(state).byDiskId(diskId).pop(),
    drive: select.edits.from(state).forPlayer(diskId),
    running: select.scalars.from(state).running(),
    editorAsset: select.assets.from(state).forEditorWebview(),
    orientation: select.scalars.from(state).orientation(),
  }
}

const mapDispatchToProps = dispatch => ({
  edit: lua => dispatch(thunks.edit(lua)),
  play: () => dispatch(thunks.play()),
  snap: edit => dispatch(actions.snap(edit)),
  stop: () => dispatch(thunks.stop()),
});

class Code extends React.Component {
  static navigationOptions = {
    header: Header
  }

  render() {
    const {
      disk,
      drive,
      editorAsset,
      navigation,
      orientation,
      running,
      play,
      snap,
      stop,
      edit,
    } = this.props

    const onMoveDivider = (x, y) => console.log(x, y)
    // console.log(drive)

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.frame1}>
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
              sourceUri={editorAsset.uri}
            />
          </View>
          <Divider orientation={orientation} onMove={onMoveDivider}>
          </Divider>
          <Player
            disk={disk}
            edit={drive}
            onSnap={snapshot => snap({
              id: drive.id,
              snapshot,
            })}
          />
        </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors[14],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },

  frame1: {
    flex: 1,
    display: "flex",
    borderRightColor: colors[14],
    borderBottomColor: colors[14],
    borderLeftColor: colors[14],
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },

  frame2: {
    flex: 1,
    display: "flex",
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },

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

export default connect(mapStateToProps, mapDispatchToProps)(Code)
