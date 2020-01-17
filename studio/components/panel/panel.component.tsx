import React from "react"
import { LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import { Panel as _Panel, selectPanels } from "@itsy.studio/studio/store/panels"
import { selectSafeArea } from "@itsy.studio/studio/store/safe-area"
import { Rect } from "@itsy.studio/types/geometry"
import styles from "./panel.module.scss"

interface PanelProps {
  children: any
  id: string
  panel: _Panel
  safeArea: Rect
}

const mapStateToProps = (state, { id }) => ({
  panel: selectPanels(state)[id],
  safeArea: selectSafeArea(state),
})

const mapDispatchToProps = {}

export function Panel({ children, id, panel, safeArea }: PanelProps) {
  const { width } = safeArea

  return (
    <View style={[styles.outer, { width }]}>
      <View style={[styles.inner, { width: width - 8 }]}>{children}</View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
