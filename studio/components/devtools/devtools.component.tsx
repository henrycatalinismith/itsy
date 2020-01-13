import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import Panels from "@itsy.studio/studio/components/panels"
import Toolbar from "@itsy.studio/studio/components/toolbar"
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
        <Panels />
      </View>
      <View style={styles.toolbar}>
        <Toolbar />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Devtools)
