import React from "react"
import { LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import {
  PanelMode,
  Panel as _Panel,
  selectPanelMode,
  selectPanels,
} from "@itsy.studio/studio/store/panels"
import { selectSafeArea } from "@itsy.studio/studio/store/safe-area"
import { Rect } from "@itsy.studio/types/geometry"
import styles from "./panel.module.scss"

interface PanelProps {
  children: any
  id: string
  panel: _Panel
  panelMode: PanelMode
  safeArea: Rect
}

const mapStateToProps = (state, { id }) => ({
  panel: selectPanels(state)[id],
  panelMode: selectPanelMode(state),
  safeArea: selectSafeArea(state),
})

const mapDispatchToProps = {}

export function Panel({ children, panel, panelMode, safeArea }: PanelProps) {
  const outerWidth = {
    [PanelMode.slide]: { width: safeArea.width },
    [PanelMode.tiles]: panel.active
      ? { flex: 1 }
      : { width: 0, display: "none" },
  }[panelMode]

  console.log(outerWidth)

  const innerWidth = {
    [PanelMode.slide]: { width: safeArea.width - 8 },
    [PanelMode.tiles]: undefined,
  }[panelMode]

  return (
    <View style={[styles.outer, outerWidth]}>
      <View style={[styles.inner, innerWidth]}>{children}</View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
