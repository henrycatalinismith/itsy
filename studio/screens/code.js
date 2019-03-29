import React from "react"

import {
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

const mapStateToProps = state => {
  return {
    disk: select.disks.from(state).byId(select.code.from(state).disk()),
    drive: select.drive.from(state).disk(),
    running: select.itsy.from(state).running(),
    editorAsset: select.assets.from(state).forEditorWebview(),
    orientation: select.layout.from(state).orientation(),
  }
}

const mapDispatchToProps = dispatch => ({
  changeCode: code => dispatch(actions.changeCode(code)),
  updateDisk: disk => dispatch(actions.updateDisk(disk)),
  play: disk => dispatch(actions.play(disk)),
  stop: () => dispatch(actions.stop()),
});

class Code extends React.Component {
  render() {
    const {
      changeCode,
      disk,
      drive,
      editorAsset,
      navigation,
      orientation,
      play,
      stop,
      running,
      updateDisk,
    } = this.props

    const onMoveDivider = (x, y) => console.log(x, y)

    return (
      <>
        <Header />
        <View style={[styles.container, styles[orientation]]}>
          <Editor
            lua={disk.lua}
            onChange={lua => {
              updateDisk({ id: disk.id, lua })
            }}
            sourceUri={editorAsset.uri}
          />
          <Divider orientation={orientation} onMove={onMoveDivider}>
            {!running && (
              <Play onPress={() => play(disk)} />
            )}
            {running && (
              <Stop onPress={() => stop()} />
            )}
          </Divider>
          <Player
            disk={drive}
            running={running}
          />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
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
