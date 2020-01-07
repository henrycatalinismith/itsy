import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import {
  DevtoolsState,
  selectDevtools,
} from "@itsy.studio/studio/store/devtools"
import Button from "@itsy.studio/studio/components/button"
import styles from "@itsy.studio/studio/components/toolbar/toolbar.module.scss"

interface ToolbarProps {
  devtools: DevtoolsState
  onSelect: (tool: string) => void
}

const mapStateToProps = (state) => ({
  devtools: selectDevtools(state),
})

const mapDispatchToProps = {}

export function Toolbar({ devtools, onSelect }: ToolbarProps) {
  return (
    <View style={styles.toolbar}>
      <Button onPress={() => onSelect("code")}>{"code"}</Button>
      <Button onPress={() => onSelect("play")}>{"play"}</Button>
      <Button onPress={() => onSelect("help")}>{"help"}</Button>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
