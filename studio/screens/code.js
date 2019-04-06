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
import Frame from "../components/frame"
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
        <Frame>
          <Header />
          <View style={[styles.container, styles[orientation]]}>
            <Editor
              lua={disk.lua}
              onChange={edit}
              sourceUri={editorAsset.uri}
            />
            <Divider orientation={orientation} onMove={onMoveDivider}>
              {running ? <Stop onPress={stop} /> : <Play onPress={play} />}
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
        </Frame>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors[1],
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
