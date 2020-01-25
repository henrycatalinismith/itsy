import React from "react"
import { StatusBar, View } from "react-native"
import { connect } from "react-redux"
import PanelSlider from "@itsy.studio/studio/components/panel-slider"
import PanelTiler from "@itsy.studio/studio/components/panel-tiler"
import Toolbar from "@itsy.studio/studio/components/toolbar"
import { PanelMode, selectPanelMode } from "@itsy.studio/studio/store/panels"
import colors from "@itsy.studio/palettes/pico8/original.es6"

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
    <>
      <StatusBar backgroundColor={colors[2]} barStyle="light-content" />
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
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Devtools)
