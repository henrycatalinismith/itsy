import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Editor from "@itsy.studio/studio/components/editor"
import Loading from "@itsy.studio/studio/components/loading"
import Player from "@itsy.studio/studio/components/player"
import Snapshot from "@itsy.studio/studio/components/snapshot"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "@itsy.studio/studio/components/devtools-code-panel/devtools-code-panel.module.scss"

interface DevtoolsCodePanelProps {
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function DevtoolsCodePanel({ screen }: DevtoolsCodePanelProps) {
  const panelWidth = {
    width: screen.width,
  }

  return (
    <View style={[styles.devtoolsCodePanel, panelWidth]}>
      <Editor />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsCodePanel)
