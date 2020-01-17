import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { selectSafeArea } from "@itsy.studio/studio/store/safe-area"
import { Rect } from "@itsy.studio/types/geometry"
import styles from "./panel.module.scss"

interface PanelProps {
  children: any
  safeArea: Rect
}

const mapStateToProps = (state) => ({
  safeArea: selectSafeArea(state),
})

const mapDispatchToProps = {}

export function Panel({ children, safeArea }: PanelProps) {
  const { width } = safeArea
  return (
    <View style={[styles.outer, { width }]}>
      <View style={[styles.inner, { width: width - 8 }]}>{children}</View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
