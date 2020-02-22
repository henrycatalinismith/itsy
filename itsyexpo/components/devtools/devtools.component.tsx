import React from "react"
import { StatusBar, View } from "react-native"
import { connect } from "react-redux"
import Header from "@highvalley.systems/itsyexpo/components/header"
import PanelSlider from "@highvalley.systems/itsyexpo/components/panel-slider"
import PanelTiler from "@highvalley.systems/itsyexpo/components/panel-tiler"
import Toolbar from "@highvalley.systems/itsyexpo/components/toolbar"
import { PanelMode, selectPanelMode } from "@highvalley.systems/itsyexpo/store/panels"
import colors from "@highvalley.systems/palettes/pico8/original.es6"

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
      <View style={styles.header}>
        <Header />
      </View>
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
