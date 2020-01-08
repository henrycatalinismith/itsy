import React from "react"
import { Animated, Easing, View } from "react-native"
import { connect } from "react-redux"
import {
  DevtoolsState,
  selectDevtools,
} from "@itsy.studio/studio/store/devtools"
import {
  KeyboardState,
  KeyboardStatus,
  selectKeyboard,
} from "@itsy.studio/studio/store/keyboard"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import DevtoolsPlayPanel from "@itsy.studio/studio/components/devtools-play-panel"
import DevtoolsToolbar from "@itsy.studio/studio/components/devtools-toolbar"
import styles from "@itsy.studio/studio/components/devtools/devtools.module.scss"

interface DevtoolsProps {
  devtools: DevtoolsState
  keyboard: KeyboardState
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  devtools: selectDevtools(state),
  keyboard: selectKeyboard(state),
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function Devtools({ devtools, keyboard, screen }: DevtoolsProps) {
  let height = 26
  const keyboardVisible = keyboard.status === KeyboardStatus.visible
  if (!keyboardVisible) {
    height += screen.width
  }

  return (
    <View style={{ ...styles.devtools, height }}>
      <DevtoolsToolbar />
      {!keyboardVisible && <DevtoolsPlayPanel />}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Devtools)
