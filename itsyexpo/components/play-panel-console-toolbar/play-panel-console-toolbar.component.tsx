import Button from "@highvalley.systems/itsyexpo/components/button"
import PlayPanelConsoleToolbarPlay from "@highvalley.systems/itsyexpo/components/play-panel-console-toolbar-play"
import { clearOutput } from "@highvalley.systems/itsyexpo/store/output"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./play-panel-console-toolbar.module.scss"

interface PlayPanelConsoleToolbarProps {
  clearOutput: () => void
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  clearOutput,
}

export function PlayPanelConsoleToolbar({
  clearOutput,
}: PlayPanelConsoleToolbarProps) {
  return (
    <View style={styles.component}>
      <PlayPanelConsoleToolbarPlay />
      <Button onPress={clearOutput}>clear</Button>
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPanelConsoleToolbar)
