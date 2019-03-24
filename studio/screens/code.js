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

import colors from "../constants/colors"
import select from "../selectors"

const mapStateToProps = state => ({
  orientation: select.layout.from(state).orientation()
})

export default connect(mapStateToProps)(({ orientation }) => {
  console.log(orientation)
  return (
    <>
      <Header />
      <View style={[styles.container, styles[orientation]]}>
        <Editor />
        <Divider orientation={orientation} />
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

