import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import DevtoolsCodePanel from "@itsy.studio/studio/components/devtools-code-panel"
import DevtoolsHelpPanel from "@itsy.studio/studio/components/devtools-help-panel"
import DevtoolsPlayPanel from "@itsy.studio/studio/components/devtools-play-panel"
import DevtoolsToolbar from "@itsy.studio/studio/components/devtools-toolbar"
import styles from "./devtools.module.scss"

interface DevtoolsProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function Devtools({}: DevtoolsProps) {
  const [tool, chooseTool] = React.useState("code")

  const onSelect = React.useCallback((t: string) => {
    chooseTool(t)
  }, [])

  return (
    <View style={styles.devtools}>
      <View style={styles.panels}>
        {tool === "code" && <DevtoolsCodePanel />}
        {tool === "play" && <DevtoolsPlayPanel />}
        {tool === "help" && <DevtoolsHelpPanel />}
      </View>
      <View style={styles.toolbar}>
        <DevtoolsToolbar onSelect={onSelect} />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Devtools)
