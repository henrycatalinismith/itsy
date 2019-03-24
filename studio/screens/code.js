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
import Player from "../components/player"

import actions from "../actions"
import colors from "../constants/colors"
import select from "../selectors"

const mapStateToProps = state => ({
  editorAsset: select.assets.from(state).forEditorWebview(),
  orientation: select.layout.from(state).orientation(),
})

const mapDispatchToProps = dispatch => ({
  changeCode: code => dispatch(actions.changeCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(({
  changeCode,
  editorAsset,
  orientation,
}) => {
  const onMoveDivider = (x, y) => console.log(x, y)
  return (
    <>
      <Header />
      <View style={[styles.container, styles[orientation]]}>
        <Editor
          onChange={changeCode}
          sourceUri={editorAsset.uri}
        />
        <Divider
          orientation={orientation}
          onMove={onMoveDivider}
        />
        <Player />
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

