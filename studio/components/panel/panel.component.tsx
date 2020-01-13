import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "./panel.module.scss"

interface PanelProps {
  children: any
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function Panel({ children, screen }: PanelProps) {
  const { width } = screen
  return (
    <View style={[styles.outer, { width }]}>
      <View style={[styles.inner, { width: width - 8 }]}>{children}</View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
