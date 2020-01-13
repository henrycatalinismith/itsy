import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import {
  DevtoolsState,
  selectDevtools,
} from "@itsy.studio/studio/store/devtools"

import { PanelId, togglePanel } from "@itsy.studio/studio/store/panels"

import Button from "@itsy.studio/studio/components/button"
import styles from "./toolbar.module.scss"

interface ToolbarProps {
  devtools: DevtoolsState
  togglePanel: (id: PanelId) => void
}

const mapStateToProps = (state) => ({
  devtools: selectDevtools(state),
})

const mapDispatchToProps = {
  togglePanel,
}

export function Toolbar({ devtools, togglePanel }: ToolbarProps) {
  return (
    <View style={styles.toolbar}>
      <Button onPress={() => togglePanel(PanelId.code)}>{"code"}</Button>
      <Button onPress={() => togglePanel(PanelId.play)}>{"play"}</Button>
      <Button onPress={() => togglePanel(PanelId.help)}>{"help"}</Button>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
