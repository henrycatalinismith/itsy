import PanelModeSlide from "@highvalley.systems/itsyexpo/components/panel-mode-slide"
import PanelModeTiles from "@highvalley.systems/itsyexpo/components/panel-mode-tiles"
import {
  PanelModes,
  selectPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./panel-mode.module.scss"

interface PanelModeProps {
  panelMode: PanelModes
}

const mapStateToProps = (state) => ({
  panelMode: selectPanelMode(state),
})

const mapDispatchToProps = {}

export function PanelMode({ panelMode }: PanelModeProps) {
  return (
    <View style={styles.component}>
      {panelMode === PanelModes.slide && <PanelModeSlide />}
      {panelMode === PanelModes.tiles && <PanelModeTiles />}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelMode)
