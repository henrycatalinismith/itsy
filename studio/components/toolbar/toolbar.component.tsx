import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import {
  PanelMode,
  Panel,
  selectPanelMode,
  selectRankedPanels,
} from "@itsy.studio/studio/store/panels"

import Storage from "@itsy.studio/studio/components/storage"
import Tab from "@itsy.studio/studio/components/tab"
import styles from "./toolbar.module.scss"

interface ToolbarProps {
  panelMode: PanelMode
  panels: Panel[]
}

const mapStateToProps = (state) => ({
  panelMode: selectPanelMode(state),
  panels: selectRankedPanels(state),
})

const mapDispatchToProps = {}

export function Toolbar({ panelMode, panels }: ToolbarProps) {
  switch (panelMode) {
    case PanelMode.slide:
      return (
        <View style={[styles.toolbar, styles.slide]}>
          {panels.map((panel) => (
            <Tab key={panel.id} id={panel.id} />
          ))}
        </View>
      )

    case PanelMode.tiles:
      return (
        <View style={[styles.toolbar, styles.tiles]}>
          <View style={[styles.corner]}>
            {panels.map((panel) => (
              <Tab key={panel.id} id={panel.id} />
            ))}
          </View>
          <View style={styles.storage}>
            <Storage />
          </View>
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
