import PanelPickerButton from "@highvalley.systems/itsyexpo/components/panel-picker-button"
import {
  Panel,
  PanelModes,
  selectPanelMode,
  selectRankedPanels,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./panel-picker.module.scss"

interface PanelPickerProps {
  panelMode: PanelModes
  panels: Panel[]
}

const mapStateToProps = (state) => ({
  panelMode: selectPanelMode(state),
  panels: selectRankedPanels(state),
})

const mapDispatchToProps = {}

export function PanelPicker({ panelMode, panels }: PanelPickerProps) {
  switch (panelMode) {
    case PanelModes.slide:
      return (
        <View style={[styles.component, styles.slide]}>
          {panels.map((panel) => (
            <PanelPickerButton key={panel.id} id={panel.id} />
          ))}
        </View>
      )

    case PanelModes.tiles:
      return (
        <View style={[styles.component, styles.tiles]}>
          <View style={[styles.corner]}>
            {panels.map((panel) => (
              <PanelPickerButton key={panel.id} id={panel.id} />
            ))}
          </View>
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPicker)
