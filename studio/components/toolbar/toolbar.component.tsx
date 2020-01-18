import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import {
  PanelId,
  Panel,
  selectRankedPanels,
  togglePanel,
} from "@itsy.studio/studio/store/panels"

import Button from "@itsy.studio/studio/components/button"
import styles from "./toolbar.module.scss"

interface ToolbarProps {
  panels: Panel[]
  togglePanel: (id: PanelId) => void
}

const mapStateToProps = (state) => ({
  panels: selectRankedPanels(state),
})

const mapDispatchToProps = {
  togglePanel,
}

export function Toolbar({ panels, togglePanel }: ToolbarProps) {
  return (
    <View style={styles.toolbar}>
      {panels.map((panel) => (
        <Button key={panel.id} onPress={() => togglePanel(panel.id)}>
          {panel.id}
        </Button>
      ))}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
