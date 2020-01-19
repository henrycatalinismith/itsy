import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import { Panel, selectRankedPanels } from "@itsy.studio/studio/store/panels"

import Tab from "@itsy.studio/studio/components/tab"
import styles from "./toolbar.module.scss"

interface ToolbarProps {
  panels: Panel[]
}

const mapStateToProps = (state) => ({
  panels: selectRankedPanels(state),
})

const mapDispatchToProps = {}

export function Toolbar({ panels }: ToolbarProps) {
  return (
    <View style={styles.toolbar}>
      {panels.map((panel) => (
        <Tab key={panel.id} id={panel.id} />
      ))}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
