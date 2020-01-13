import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import {
  DevtoolsState,
  selectDevtools,
} from "@itsy.studio/studio/store/devtools"

import { PanelId, togglePanel } from "@itsy.studio/studio/store/panels"

import Button from "@itsy.studio/studio/components/button"
import styles from "./devtools-toolbar.module.scss"

interface DevtoolsToolbarProps {
  devtools: DevtoolsState
  togglePanel: (id: PanelId) => void
}

const mapStateToProps = (state) => ({
  devtools: selectDevtools(state),
})

const mapDispatchToProps = {
  togglePanel,
}

export function DevtoolsToolbar({
  devtools,
  togglePanel,
}: DevtoolsToolbarProps) {
  return (
    <View style={styles.devtoolsToolbar}>
      <Button onPress={() => togglePanel(PanelId.code)}>{"code"}</Button>
      <Button onPress={() => togglePanel(PanelId.play)}>{"play"}</Button>
      <Button onPress={() => togglePanel(PanelId.help)}>{"help"}</Button>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsToolbar)
