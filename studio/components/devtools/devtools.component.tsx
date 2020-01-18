import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import PanelSlider from "@itsy.studio/studio/components/panel-slider"
import PanelTiler from "@itsy.studio/studio/components/panel-tiler"
import Toolbar from "@itsy.studio/studio/components/toolbar"
import { PanelMode, selectPanelMode } from "@itsy.studio/studio/store/panels"

import styles from "./devtools.module.scss"

interface DevtoolsProps {
  panelMode: PanelMode
}

const mapStateToProps = (state) => ({
  panelMode: selectPanelMode(state),
})

const mapDispatchToProps = {}

export function Devtools({ panelMode }: DevtoolsProps) {
  console.log(panelMode)
  return (
    <View style={styles.devtools}>
      <View style={styles.panels}>
        {
          {
            [PanelMode.slide]: <PanelSlider />,
            [PanelMode.tiles]: <PanelTiler />,
          }[panelMode]
        }
      </View>
      <View style={styles.toolbar}>
        <Toolbar />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Devtools)
