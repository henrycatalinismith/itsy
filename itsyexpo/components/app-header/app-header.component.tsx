import AppHeaderIcon from "@highvalley.systems/itsyexpo/components/app-header-icon"
import AppHeaderStorageIndicator from "@highvalley.systems/itsyexpo/components/app-header-storage-indicator"
import AppHeaderTitle from "@highvalley.systems/itsyexpo/components/app-header-title"
import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import PanelPicker from "@highvalley.systems/itsyexpo/components/panel-picker"
import {
  PanelModes,
  selectPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header.module.scss"

interface AppHeaderProps {
  panelMode: PanelModes
}

const mapStateToProps = (state) => ({
  panelMode: selectPanelMode(state),
})

const mapDispatchToProps = {}

export function AppHeader({ panelMode }: AppHeaderProps) {
  return (
    <View style={styles.component}>
      {panelMode === PanelModes.slide && (
        <View style={styles.slideLayout}>
          <View style={styles.slideLayoutFirstRow}>
            <View style={styles.slideLayoutFirstRowLeftColumn}>
              <AppHeaderIcon />
              <AppHeaderTitle />
              <AppHeaderStorageIndicator />
            </View>
            <View style={styles.slideLayoutFirstRowRightColumn}>
              <Button action={() => {}} theme={ButtonThemes.Red}>
                undo
              </Button>
            </View>
          </View>
          <View style={styles.slideLayoutSecondRow}>
            <PanelPicker />
          </View>
        </View>
      )}

      {panelMode === PanelModes.tiles && (
        <View style={styles.tileLayout}>
          <View style={styles.tileLayoutLeftCorner}>
            <AppHeaderIcon />
            <AppHeaderTitle />
            <AppHeaderStorageIndicator />
          </View>

          <View style={styles.tileLayoutCenter}>
            <PanelPicker />
          </View>

          <View style={styles.tileLayoutRightCorner}>
            <Button action={() => {}} theme={ButtonThemes.Red}>
              undo
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
