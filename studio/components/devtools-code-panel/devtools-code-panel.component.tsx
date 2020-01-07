import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Editor from "@itsy.studio/studio/components/editor"
import Loading from "@itsy.studio/studio/components/loading"
import Player from "@itsy.studio/studio/components/player"
import Snapshot from "@itsy.studio/studio/components/snapshot"
import { PlayerState, playerSelector } from "@itsy.studio/studio/store/player"
import styles from "@itsy.studio/studio/components/devtools-code-panel/devtools-code-panel.module.scss"

interface DevtoolsCodePanelProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function DevtoolsCodePanel({}: DevtoolsCodePanelProps) {
  return (
    <View style={styles.devtoolsCodePanel}>
      <Editor />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsCodePanel)
