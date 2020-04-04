import Header from "@highvalley.systems/itsyexpo/components/header"
import PanelMode from "@highvalley.systems/itsyexpo/components/panel-mode"
import PanelPicker from "@highvalley.systems/itsyexpo/components/panel-picker"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import React from "react"
import { StatusBar, View } from "react-native"
import { connect } from "react-redux"
import styles from "./devtools.module.scss"

interface DevtoolsProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function Devtools({}: DevtoolsProps) {
  return (
    <>
      <StatusBar backgroundColor={colors[2]} barStyle="light-content" />
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.component}>
        <PanelMode />
        <PanelPicker />
      </View>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Devtools)
