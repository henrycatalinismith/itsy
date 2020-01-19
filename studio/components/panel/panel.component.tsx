import _ from "lodash"
import React from "react"
import { LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import {
  PanelMode,
  Panel as _Panel,
  selectActivePanels,
  selectPanelMode,
  selectPanels,
} from "@itsy.studio/studio/store/panels"
import { selectSafeArea } from "@itsy.studio/studio/store/safe-area"
import { Rect } from "@itsy.studio/types/geometry"
import styles from "./panel.module.scss"

interface PanelProps {
  activePanels: _Panel[]
  children: any
  id: string
  panel: _Panel
  panelMode: PanelMode
  safeArea: Rect
}

const mapStateToProps = (state, { id }) => ({
  activePanels: selectActivePanels(state),
  panel: selectPanels(state)[id],
  panelMode: selectPanelMode(state),
  safeArea: selectSafeArea(state),
})

const mapDispatchToProps = {}

export function Panel({
  activePanels,
  children,
  panel,
  panelMode,
  safeArea,
}: PanelProps) {
  switch (panelMode) {
    case PanelMode.slide:
      return (
        <View style={[styles.slide, { width: safeArea.width }]}>
          <View style={[styles.inner, { width: safeArea.width - 8 }]}>
            {children}
          </View>
        </View>
      )

    case PanelMode.tiles:
      const tileStyles = [styles.tile]

      if (panel.active) {
        tileStyles.push({ flex: 1 })
      } else {
        tileStyles.push({ width: 0, display: "none" })
      }

      if (_.first(activePanels).id === panel.id) {
        tileStyles.push(styles.firstTile)
      }

      if (_.last(activePanels).id === panel.id) {
        tileStyles.push(styles.lastTile)
      }

      return (
        <View style={tileStyles}>
          <View style={[styles.inner]}>{children}</View>
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)