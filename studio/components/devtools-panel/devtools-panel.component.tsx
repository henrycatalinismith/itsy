import { Asset } from "expo-asset"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./devtools-panel.module.scss"

interface DevtoolsPanelProps {
  children: any
  width: number
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

export function DevtoolsPanel({ children, width }: DevtoolsPanelProps) {
  return <View style={[styles.devtoolsPanel, { width }]}>{children}</View>
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsPanel)
