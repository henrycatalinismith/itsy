import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import {
  DevtoolsState,
  selectDevtools,
} from "@itsy.studio/studio/store/devtools"
import Button from "@itsy.studio/studio/components/button"
import styles from "./devtools-toolbar.module.scss"

interface DevtoolsToolbarProps {
  devtools: DevtoolsState
  onSelect: (tool: string) => void
}

const mapStateToProps = (state) => ({
  devtools: selectDevtools(state),
})

const mapDispatchToProps = {}

export function DevtoolsToolbar({ devtools, onSelect }: DevtoolsToolbarProps) {
  return (
    <View style={styles.devtoolsToolbar}>
      <Button onPress={() => onSelect("code")}>{"code"}</Button>
      <Button onPress={() => onSelect("play")}>{"play"}</Button>
      <Button onPress={() => onSelect("help")}>{"help"}</Button>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsToolbar)
