import React from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"

import Devtools from "@itsy.studio/studio/components/devtools"
import DevtoolsCodePanel from "@itsy.studio/studio/components/devtools-code-panel"
import DevtoolsHelpPanel from "@itsy.studio/studio/components/devtools-help-panel"
import DevtoolsPlayPanel from "@itsy.studio/studio/components/devtools-play-panel"
import Divider from "@itsy.studio/studio/components/divider"
import Editor from "@itsy.studio/studio/components/editor"
import Frame from "@itsy.studio/studio/components/frame"
import Header from "@itsy.studio/studio/components/header"
import SafeArea from "@itsy.studio/studio/components/safe-area"
import Toolbar from "@itsy.studio/studio/components/toolbar"
import Loading from "@itsy.studio/studio/components/loading"
import Play from "@itsy.studio/studio/components/play"
import Player from "@itsy.studio/studio/components/player"
import Snapshot from "@itsy.studio/studio/components/snapshot"
import Stop from "@itsy.studio/studio/components/stop"

import colors from "@itsy.studio/palettes/pico8/original.es6"

import { playerSelector } from "@itsy.studio/studio/store/player"
import { selectScreenOrientation } from "@itsy.studio/studio/store/screen"

const mapStateToProps = (state) => ({
  orientation: selectScreenOrientation(state),
  player: playerSelector(state),
})

const mapDispatchToProps = {}

export function CodeScreen({ orientation, player }) {
  const [tool, chooseTool] = React.useState("code")

  const onSelect = React.useCallback((t: string) => {
    chooseTool(t)
  }, [])

  return (
    <SafeArea>
      <View style={[styles.container, styles[orientation]]}>
        <View style={styles.editorContainer}>
          {tool === "code" && <DevtoolsCodePanel />}
          {tool === "play" && <DevtoolsPlayPanel />}
          {tool === "help" && <DevtoolsHelpPanel />}
        </View>
        <Toolbar onSelect={onSelect} />
      </View>
    </SafeArea>
  )
}

CodeScreen.navigationOptions = {
  header: Header,
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
