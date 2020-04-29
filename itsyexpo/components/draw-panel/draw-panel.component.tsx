import DrawPanelWebview from "@highvalley.systems/itsyexpo/components/draw-panel-webview"
import {
  PanelAvailabilities,
  selectDrawPanelAvailability,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./draw-panel.module.scss"

interface DrawPanelProps {
  drawPanelAvailability: PanelAvailabilities
}

const mapStateToProps = (state) => ({
  drawPanelAvailability: selectDrawPanelAvailability(state),
})

const mapDispatchToProps = {}

export function DrawPanel({ drawPanelAvailability }: DrawPanelProps) {
  return React.useMemo(
    () => (
      <View style={styles.component}>
        {drawPanelAvailability === PanelAvailabilities.Available && (
          <DrawPanelWebview onLoad={() => {}} />
        )}
      </View>
    ),
    [drawPanelAvailability]
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanel)
