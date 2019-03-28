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

import actions from "../actions"
import colors from "../constants/colors"
import select from "../selectors"

const mapStateToProps = state => {
  return {
    disk: select.disks.from(state).byId(select.code.from(state).disk()),
    drive: select.drive.from(state).disk(),
    editorAsset: select.assets.from(state).forEditorWebview(),
    orientation: select.layout.from(state).orientation(),
  }
}

const mapDispatchToProps = dispatch => ({
  changeCode: code => dispatch(actions.changeCode(code)),
  updateDisk: disk => dispatch(actions.updateDisk(disk)),
  play: disk => dispatch(actions.play(disk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(({
  changeCode,
  disk,
  drive,
  editorAsset,
  navigation,
  orientation,
  play,
  updateDisk,
}) => {
  const onMoveDivider = (x, y) => console.log(x, y)
  console.log(disk.id)
  console.log(disk.lua)
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
          <Play onPress={() => play(disk)} />
        </Divider>
        <Player disk={drive} />
      </View>
    </>
  )
})

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

